class AdaptationMechanism {
  static start(feature_tree = [], agents = []) {
    const aggregation = this._monitor(agents);
    const affectedFeatures = this._analysis(aggregation, feature_tree);
    const changeList = this._planning(affectedFeatures, feature_tree);

    return this._execution(changeList, feature_tree);
  }

  static _monitor(agents = []) {
    console.log("MONITOR");
    console.log(agents);

    let aggregation = [];

    agents.map(({ contexts }) => {
      const data = contexts.map(({ id, value }) => ({ agent: id, value }));
      aggregation = [...aggregation, ...data];
    });

    return aggregation;
  }

  static _analysis(aggregation = [], feature_tree = []) {
    console.log("ANALYSIS");
    console.log(aggregation);

    const dependencyGraph = this._extractDependencies(feature_tree[0]);
    const filtered = dependencyGraph.filter(obj => obj.affectedBy.length);

    let affectedFeatureMapping = [];
    for (const agg of aggregation) {
      const affects = this._extractAffectedDependencies(agg.agent, filtered);
      const sortedAffects = this._sortExtractedDependencies(affects);

      affectedFeatureMapping.push({
        agent: agg.agent,
        value: agg.value,
        affects: sortedAffects
      });
    }

    return affectedFeatureMapping;
  }

  static _planning(affectedFeatureMapping = [], feature_tree = []) {
    console.log("PLANNING");
    console.log(affectedFeatureMapping);

    const features = {};
    let order = 0;
    for (const agent of affectedFeatureMapping) {
      let currentAddress = { id: agent.agent, value: agent.value };

      for (const affectedFeature of agent.affects) {
        // FIXME, código duplicado
        if (features[affectedFeature["address"]]) {
          currentAddress = features[affectedFeature["address"]];
        } else {
          if (!currentAddress.id.includes("ca")) {
            currentAddress = this._getAddress(
              affectedFeature["address"],
              feature_tree[0]
            );
          }
        }

        // TODO buscar endereço afetado
        let feature;
        if (features[affectedFeature["affects"]]) {
          feature = features[affectedFeature["affects"]];
        } else {
          feature = this._getAddress(
            affectedFeature["affects"],
            feature_tree[0]
          );
          feature = { ...feature, order };
          order++;
        }

        // TODO descobrir como o endereço é afetado
        let updatedFeature = this._updateWithCurrentDependencyValue(
          currentAddress,
          feature
        );

        // FIXME, código duplicado
        let defaultState;
        for (const state of updatedFeature.states) {
          if (!state.requires.length) {
            defaultState = state;
          }

          let matches = true;

          for (const req of state.requires) {
            if (req.value !== req.current) {
              matches = false;
            }
          }

          if (matches) {
            defaultState = state;
          }
        }

        features[feature.id] = { ...updatedFeature, value: defaultState.value };
      }
    }

    const featureList = Object.values(features).sort(
      (a, b) => a.order - b.order
    );

    const change = [];
    for (const feature of featureList) {
      change.push({ address: feature.id, value: feature.value });
    }

    return change;
  }

  static _execution(changes = [], feature_tree = []) {
    console.log("EXECUTING");
    console.log(changes);

    for (const change of changes) {
      this._applyChanges(change, feature_tree);
    }

    return feature_tree;
  }

  /**
   *
   * @param feature
   * @returns {[{address: string,affectedBy: Array<string>}]}
   */
  static _extractDependencies(feature) {
    if (!feature) return [];

    const a = { address: feature.id, affectedBy: [] };

    if (feature.states) {
      feature.states.map(state => {
        state.requires.map(obj => a.affectedBy.push(obj.address));
      });
    }

    let res = [];
    if (feature.children) {
      for (const child of feature.children) {
        res = [...res, ...this._extractDependencies(child)];
      }
    }

    return [a, ...res];
  }

  static _extractAffectedDependencies(address, graph = [], exclude = []) {
    let response = [];

    for (const dep of graph) {
      if (dep.affectedBy.includes(address)) {
        response.push({ address, affects: dep.address });

        if (!exclude.includes(dep.address)) {
          exclude.push(dep.address);
          const res = this._extractAffectedDependencies(
            dep.address,
            graph,
            exclude
          );
          response = [...response, ...res];
        }
      }
    }

    return response;
  }

  static _sortExtractedDependencies(dependencies = []) {
    const sorted = [];
    for (const key in dependencies) {
      const subarray = dependencies.slice(parseInt(key));
      for (const el of subarray) {
        const alreadyAdded = sorted.filter(
          ({ address, affects }) =>
            el.address === address && el.affects === affects
        )[0];
        if (!alreadyAdded && dependencies[key].address === el.address) {
          sorted.push(el);
        }
      }
    }
    return sorted;
  }

  static _getAddress(address, feature) {
    if (!feature) return;

    if (feature.children) {
      for (const child of feature.children) {
        if (child["id"] === address) return child;
        const response = this._getAddress(address, child);
        if (response) return response;
      }
    }
  }

  static _updateWithCurrentDependencyValue(trigger, feature) {
    for (let state of feature.states) {
      for (let req of state.requires) {
        // Ver se o gatilho é requerido nesse estado
        let current = !!req.current;
        if (req.address === trigger.id) {
          current = trigger.value;
        }
        req.current = current;
      }
    }

    return feature;
  }

  static _applyChanges(change, children) {
    for (const child of children) {
      if (child["id"] === change["address"]) {
        child["value"] = change["value"];
      } else {
        this._applyChanges(change, child.children);
      }
    }
  }
}

export default AdaptationMechanism;
