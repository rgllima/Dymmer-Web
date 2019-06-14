function runContextAnalysis(feature, featureModel) {
  switch (feature.father.type) {
    case "g":
      console.log("DO SOMETHING - G");
      return analyseGroupedFeatures(feature, featureModel);
    case "m":
      console.log("DO SOMETHING - M");
      break;
    case "o":
      console.log("DO SOMETHING - O");
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

function analyseGroupedFeatures(feature, featureModel) {
  let grandfather = searchGrandfather(
    feature.father,
    featureModel.feature_tree[0]
  );

  let context = searchCurrentContext(featureModel.contexts);
  let isChecked = context.resolutions.filter(
    data => data.feature_id === grandfather.id
  )[0];

  if (!isChecked || !isChecked.status) {
    console.log("TEM QUE RETONAR ERRO");
    return [];
  }

  console.log("Vô Marcado", isChecked);
  console.log("GF: ", grandfather, "CT: ", context);

  if (feature.father.multiplicity === "1,1") {
    let response = [];
    grandfather.children[0].children.map(child => {
      console.log(child);
      if (child.id === feature.id)
        response.push({ id: child.id, status: true });
      else response.push({ id: child.id, status: false });
    });
    return response;
  }
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

export { runContextAnalysis };
