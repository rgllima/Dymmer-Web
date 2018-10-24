
export const numberOfFeatures = async(feature_tree) => {
    let response = 0
    if (feature_tree.children) {
        for(let i=0; i<feature_tree.children.length; i++) {
            if (feature_tree.children[i].type == 'g')
                response += await numberOfFeatures(feature_tree.children[i])
            else
                response += await numberOfFeatures(feature_tree.children[i]) + 1
        }
    }
    return response;
}

export const numberOfMandatoryFeatures = async(feature_tree) => {
    let response = 0
    if (feature_tree.children) {
        for(let i=0; i<feature_tree.children.length; i++) {
            if (feature_tree.children[i].type == 'm')
                response += await numberOfMandatoryFeatures(feature_tree.children[i]) + 1
            else
                response += await numberOfMandatoryFeatures(feature_tree.children[i])
        }
    }
    return response;
}

export const numberOfOptionalFeatures = async(feature_tree) => {
    let response = 0
    if (feature_tree.children) {
        for(let i=0; i<feature_tree.children.length; i++) {
            if (feature_tree.children[i].type == 'o')
                response += await numberOfOptionalFeatures(feature_tree.children[i]) + 1
            else
                response += await numberOfOptionalFeatures(feature_tree.children[i])
        }
    }
    return response;
}

export const numberOfGroupedFeatures = async(feature_tree) => {
    let response = 0
    if (feature_tree.children) {
        for(let i=0; i<feature_tree.children.length; i++) {
            if (feature_tree.children[i].type == '')
                response += await numberOfGroupedFeatures(feature_tree.children[i]) + 1
            else
                response += await numberOfGroupedFeatures(feature_tree.children[i])
        }
    }
    return response;
}

export const numberGroupesOr = async(feature_tree) => {
    let response = 0
    if (feature_tree.children) {
        for(let i=0; i<feature_tree.children.length; i++) {
            if (feature_tree.children[i].type == 'g' && feature_tree.children[i].multiplicity == '1,')
                response += await numberGroupesOr(feature_tree.children[i]) + 1
            else
                response += await numberGroupesOr(feature_tree.children[i])
        }
    }
    return response;
}

export const numberGroupesXor = async(feature_tree) => {
    let response = 0
    if (feature_tree.children) {
        for(let i=0; i<feature_tree.children.length; i++) {
            if (feature_tree.children[i].type == 'g' && feature_tree.children[i].multiplicity == '1,1')
                response += await numberGroupesXor(feature_tree.children[i]) + 1
            else
                response += await numberGroupesXor(feature_tree.children[i])
        }
    }
    return response;
}