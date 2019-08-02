/**
 * Las modify -> july 31 2019
 * This code is very complex then it has a exhaustive documentation to guide future
 * maintenance. The comments are necessary to avoid the developers spends a lot of
 * time understanding how it works.
 */

/** IMPORTANT:
 * We use 3 values to represent the actions on the context: true is used to activate a feature,
 * 'false' is used to disable a feature and 'null' is used to remove the feature from context.
 */

/**
 * Check 'feature' type to execute a specific code for it
 * @param {*} feature
 * @param {*} featureModel
 */
function runContextAnalysis(feature, featureModel) {
  let context = searchCurrentContext(featureModel.contexts);
  let father = searchFather(feature, featureModel.feature_tree[0]);

  console.log("C: ", feature, "F: ", feature.father, "Father: ", father);

  let grandfather = searchGrandfather(
    feature.father,
    featureModel.feature_tree[0]
  );

  /**
   * It's necessary apply different strategies for each father type.
   * Each father type has a specific behavior.
   */

  switch (feature.father.type) {
    case "": // This execute the same code when 'type' is an empty string => "" or 'type' is the 'o' string.
    case "o":
      if (!verifyHierarchyIsChecked(feature, feature.father, context))
        throw "You cannot enable this feature! Please check the ancestors!";
      return analyseOptionalFeatures(feature, father, context);

    case "g":
      if (!verifyHierarchyIsChecked(feature, grandfather, context))
        throw "You cannot enable this feature! Please check the ancestors!";
      return analyseGroupedFeatures(feature, father, context);

    case "m":
      if (!verifyHierarchyIsChecked(feature, feature.father, context))
        throw "You cannot enable this feature! Please check the ancestors!";
      return analyseOptionalFeatures(feature, father, context);

    case "r":
      return analyseOptionalFeatures(feature, father, context);
  }
  return [];
}

/**
 *
 * @param {*} feature
 * @param {*} grandfather
 */
function analyseGroupedFeatures(feature, father, context) {
  let response = [];
  // let ft_type_boolean = typeof feature.status === "boolean" ? true : false;
  let multiplicity = feature.father.multiplicity;

  father.children.map(child => {
    if (child.id !== feature.id) {
      let ftExists = checkIfFeatureExistsInTheContext(child, context);

      console.log("Ft: ", feature.id, "Cld: ", child.id, "Ext: ", ftExists);

      if (multiplicity === "1,1" && ftExists && feature.status) {
        response.push({ id: child.id, status: false });
        response = response.concat(changeChildStatusToFalse(child, context));
      }
    } else {
      response.push({ id: child.id, status: feature.status });
      if (feature.status)
        response = response.concat(changeMandatoryFeatureToTrue(child));
      else response = response.concat(changeChildStatusToFalse(child, context));
    }
  });
  return response;
}

/**
 * 1) Search the child feature that it'll be analyse;
 * 2) If child feature was found, verify feature status and
 * 2.1) Status = TRUE => Enable mandatory child features;
 * 2.2) Status = FALSE => Disable all child features;
 * @param {*} feature
 * @param {*} father
 */
function analyseOptionalFeatures(feature, father, context) {
  let response = [];
  let child_feature = father.children.filter(
    father_child => father_child.id === feature.id
  )[0];

  if (child_feature) {
    if (feature.status)
      response = response.concat(changeMandatoryFeatureToTrue(child_feature));
    else
      response = response.concat(
        changeChildStatusToFalse(child_feature, context)
      );
  }

  response.push({ id: feature.id, status: feature.status });
  return response;
}

/**
 * This function verify if the ancestor features are activated
 * @param {*} ancestral
 * @param {*} context
 */
function verifyHierarchyIsChecked(feature, ancestral, context) {
  let isChecked = context.resolutions.filter(
    child => child.feature_id === ancestral.id
  )[0];

  if (typeof isChecked === "undefined") return false;
  if (!isChecked.status && feature.status) return false;
  return true;
}

/**
 * This function search the feature father from any feature
 * @param {*} child
 * @param {*} feature_tree
 */
function searchFather(child, feature_tree) {
  let father;
  for (const child_candidate of feature_tree.children) {
    if (child.id === child_candidate.id) return feature_tree;
    else father = searchGrandfather(child, child_candidate);

    if (father) break;
  }
  return father;
}

/**
 * This function search the feature grandfather from any feature
 * @param {*} father
 * @param {*} feature_tree
 */
function searchGrandfather(father, feature_tree) {
  let grandfather;
  for (const child of feature_tree.children) {
    if (child.id === father.id) return feature_tree;
    else grandfather = searchGrandfather(father, child);

    if (grandfather) break;
  }
  return grandfather;
}

/**
 * This function search what's the current context
 * @param {*} contexts
 */
function searchCurrentContext(contexts) {
  for (const context of contexts) {
    if (context.isTheCurrent) return context;
  }
}

/**
 * This function will disable all child features
 * @param {*} father
 */
function changeChildStatusToFalse(father, context) {
  let response = [];
  father.children.map(child => {
    let ftExists = checkIfFeatureExistsInTheContext(child, context);

    if (child.type !== "g" && ftExists)
      response.push({ id: child.id, status: false });
    response = response.concat(changeChildStatusToFalse(child, context));
  });
  return response;
}

/**
 * This function will enable all mandatory child features
 * @param {*} father
 */
function changeMandatoryFeatureToTrue(father) {
  let response = [];
  father.children.map(child => {
    if (child.type === "m") {
      response.push({ id: child.id, status: true });
      response = response.concat(changeMandatoryFeatureToTrue(child));
    }
  });
  return response;
}

function checkIfFeatureExistsInTheContext(feature, context) {
  return context.resolutions.filter(ftr => ftr.feature_id === feature.id)[0];
}

export { runContextAnalysis };
