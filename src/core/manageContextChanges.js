/**
 * Las modify -> june 14 2019
 * This code is very complex then it has a exhaustive documentation to guide future
 * maintenance. Perhaps the comments being very ugly, but it are necessary to avoid the
 * developers spends a lot of time understanding how it work.
 */

function runContextAnalysis(feature, featureModel) {
  let context = searchCurrentContext(featureModel.contexts);
  let grandfather = searchGrandfather(
    feature.father,
    featureModel.feature_tree[0]
  );

  console.log("F", feature.father, "GF: ", grandfather);

  switch (feature.father.type) {
    // Father type is a group of features
    case "g":
      if (!verifyHierarchyIsChecked(grandfather, context))
        throw "You cannot change this feature! Please, verify hierarchy!";
      return analyseGroupedFeatures(feature, grandfather);

    // Father type is child of a group of features
    case "":
      console.log("DO SOMETHING - ''");
      if (!verifyHierarchyIsChecked(feature.father, context))
        throw "You cannot change this feature! Please, verify hierarchy!";
      break;

    // Father type is a mandatory feature
    case "m":
      console.log("DO SOMETHING - M");
      // if (!verifyHierarchyIsChecked(feature.father, context))
      //   throw "Erro aki chapa";
      break;

    // Father type is an optional feature
    case "o":
      console.log("DO SOMETHING - O");
      if (!verifyHierarchyIsChecked(feature.father, context))
        throw "You cannot change this feature! Please, verify hierarchy!";
      break;
    default:
      break;
  }
  console.log("ManageCOntext", feature, featureModel.feature_tree);
  return [feature];
}

/**
 * Preciso saber quem é o avô da feature que eu estou tentando marcar
 * em seguida, verifico se o avô está marcado, se sim, continuo o processo de marcação
 * senão, devo retonar erro.
 */

function analyseGroupedFeatures(feature, grandfather) {
  // let grandfather = searchGrandfather(
  //   feature.father,
  //   featureModel.feature_tree[0]
  // );

  // let context = searchCurrentContext(featureModel.contexts);
  // let isChecked = context.resolutions.filter(
  //   data => data.feature_id === grandfather.id
  // )[0];

  // if (!isChecked || !isChecked.status) {
  //   console.log("TEM QUE RETONAR ERRO");
  //   return [];
  // }

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

function verifyHierarchyIsChecked(ancestral, context) {
  let isChecked = context.resolutions.filter(
    child => child.feature_id === ancestral.id
  )[0];

  console.log(!isChecked, !isChecked.status);
  if (!isChecked || !isChecked.status) return false;
  return true;
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
