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

export { getFeatureReference, getFeatureParentReference };
