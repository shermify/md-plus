const fileUpload = (state = { fileCount: 0 }, action) => {
  switch (action.type) {
    case 'FILE_UPLOAD_COMPLETE':
      return { ...state, fileCount: state.fileCount + 1 };

    default:
      return state;
  }
};

export default fileUpload;
