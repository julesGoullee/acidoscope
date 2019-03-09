
export const waitNextTick = async (wrapper) => {
  return new Promise(resolve => {
    wrapper.vm.$nextTick(() => resolve());
  });
};

export default {
  waitNextTick
};
