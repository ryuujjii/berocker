export function actionVideo() {
    const actionVideo = document.querySelector(".action__video")
    
    actionVideo.muted = true;
    actionVideo.play();
    actionVideo.currentTime = 0;
}