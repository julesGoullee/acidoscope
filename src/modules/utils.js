function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type:mime});
}

export function download (filename, imgData){

  const element = document.createElement('a');
  const blob = dataURLtoBlob(imgData);
  const objurl = window.URL.createObjectURL(blob);

  element.setAttribute('href', objurl);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);

}

const Utils = {
  download,
};

export default Utils;
