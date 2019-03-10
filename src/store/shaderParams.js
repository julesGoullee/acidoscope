const ShaderParamsModule = {

  //state: {},

  mutations: {

    setParamValue(state, { paramName, paramValue }) {

      const shaderParams = state.shaderEngine.shaderParams;
      shaderParams.setUniformValue(paramName, paramValue);

    },


  },

  //actions: {},

  getters: {
    getParamValue: state => paramName => {
      const shaderParams = state.shaderEngine.shaderParams;
      return shaderParams.getUniformValue(paramName);
    },
    getParamsList: state => {
      const shaderParams = state.shaderEngine.shaderParams;
      return shaderParams.initialParams;
    },
  },

};

export default ShaderParamsModule;
