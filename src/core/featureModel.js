function getFeatureReference(id, feature_tree) {
  let feature;

  for (const child of feature_tree) {
    if (child.id === id) return child;
    else feature = getFeatureReference(id, child.children);

    if (feature) break;
  }
  return feature;
}

function getFeatureParentReference(id, feature_tree) {
  let feature;

  for (const child of feature_tree.children) {
    if (child.id === id) return feature_tree;
    else feature = getFeatureParentReference(id, child);

    if (feature) break;
  }
  return feature;
}

function getLastFeatureId(feature_tree) {
  let id = 1;

  let a = feature_tree.id.split("_");
  let c = parseInt(a[a.length - 1]);
  if (c > id) id = c;

  for (const child of feature_tree.children) {
    let b = getLastFeatureId(child);
    console.log("b: ", b, "id:", id);
    if (b > id) id = b;
  }
  return id;
}

export { getFeatureReference, getFeatureParentReference, getLastFeatureId };
