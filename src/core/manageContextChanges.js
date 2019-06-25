/**
 * Las modify -> june 14 2019
 * This code is very complex then it has a exhaustive documentation to guide future
 * maintenance. Perhaps the comments being very ugly, but it are necessary to avoid the
 * developers spends a lot of time understanding how it works.
 */

function runContextAnalysis(feature, featureModel) {
  let context = searchCurrentContext(featureModel.contexts);
  let father = searchFather(feature, featureModel.feature_tree[0]);

  console.log("C: ", feature, "F: ", feature.father, "Father: ", father);

  if (feature.father.type === "" || feature.father.type === "o") {
    if (!verifyHierarchyIsChecked(feature.father, context))
      throw "You cannot enable this feature! Please check the ancestors!";

    if (feature.type === "m") return analyseMandatoryFeatures(feature);
    else if (feature.type === "o")
      return analyseOptionalFeatures(feature, father);
  } else if (feature.father.type === "g") {
    let grandfather = searchGrandfather(
      feature.father,
      featureModel.feature_tree[0]
    );
    console.log(grandfather);
    if (!verifyHierarchyIsChecked(grandfather, context))
      throw "You cannot enable this feature! Please check the ancestors!";
    return analyseGroupedFeatures(feature, grandfather);
  } else if (feature.father.type === "m") {
    if (!verifyHierarchyIsChecked(feature.father, context))
      throw "You cannot enable this feature! Please check the ancestors!";
    return analyseOptionalFeatures(feature, father);
  } else if (feature.father.type === "r") {
    return analyseOptionalFeatures(feature, father);
  }
  return [];
}

function analyseGroupedFeatures(feature, grandfather) {
  let response = [];
  let child_feature = null;

  grandfather.children[0].children.map(child => {
    if (child.id !== feature.id) {
      if (feature.father.multiplicity === "1,1")
        response.push({ id: child.id, status: false });
    } else {
      response.push({ id: child.id, status: feature.status });
      child_feature = child;
    }
  });

  if (!feature.status && child_feature) {
    response = response.concat(changeChildStatusToFalse(child_feature));
  }

  return response;
}

function analyseMandatoryFeatures(feature) {
  if (!feature.status) throw "You cannot disable a Mandatory feature!";
  return [{ id: feature.id, status: feature.status }];
}

function analyseOptionalFeatures(feature, father) {
  let response = [];
  let child_feature = null;

  if (!feature.status) {
    child_feature = father.children.filter(
      father_child => father_child.id === feature.id
    )[0];

    if (child_feature)
      response = response.concat(changeChildStatusToFalse(child_feature));
  }
  response.push({ id: feature.id, status: feature.status });
  return response;
}

function verifyHierarchyIsChecked(ancestral, context) {
  let isChecked = context.resolutions.filter(
    child => child.feature_id === ancestral.id
  )[0];

  if (!isChecked || !isChecked.status) return false;
  return true;
}

function searchFather(child, feature_tree) {
  let father;
  for (const child_candidate of feature_tree.children) {
    if (child.id === child_candidate.id) return feature_tree;
    else father = searchGrandfather(child, child_candidate);

    if (father) break;
  }
  return father;
}

function searchGrandfather(father, feature_tree) {
  let grandfather;
  for (const child of feature_tree.children) {
    if (child.id === father.id) return feature_tree;
    else grandfather = searchGrandfather(father, child);

    if (grandfather) break;
  }
  return grandfather;
}

function searchCurrentContext(contexts) {
  for (const context of contexts) {
    if (context.isTheCurrent) return context;
  }
}

function changeChildStatusToFalse(father) {
  let response = [];
  father.children.map(child => {
    if (child.type !== "g") response.push({ id: child.id, status: false });
    response = response.concat(changeChildStatusToFalse(child));
  });
  return response;
}

export { runContextAnalysis };
