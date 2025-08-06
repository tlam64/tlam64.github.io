// The system will be capable of playing one audio at a time
audioPlayer = null
audioPlayerDom = null
speakItems = null
currentItem = 0
currentAudioId = ''
function clearAudioSetting () {
    // stop playing audio
    audioPlayer.stop()
    // clear click to play event handling and highlight
    for (let i = 0; i< speakItems.length; i++) {
        speakItems[i].classList.remove('highLight')
        speakItems.removeEventListener('click', changePlayPosition)
    }
    speakItems = null
    audioPlayer = null
    currentItem = 0
}
function changePlayPosition (e) {
    if (audioPlayer) {
        // console.log(e.target)
        // console.log(e.target)
        console.log(e.target.getAttribute('at'))
        let ap = e.target.getAttribute('at') || e.target.parentNode.getAttribute('at') || e.target.parentNode.parentNode.getAttribute('at')
        audioPlayer.currentTime = parseFloat(ap)
        if (audioPlayerDom.value=='Pause')
            audioPlayer.play()
    }
}
function getSpeakList (dom) {
    audioPlayerDom = dom
    if (dom.value=='Pause') {
        audioPlayer.pause()
        dom.value='Play'
        return
    }
    if (dom.value=='Play') {
        audioPlayer.play()
        dom.value='Pause'
        return
    }
    let aID = dom.getAttribute('audioid')
    if (currentAudioId && aID != currentAudioId) clearAudioSetting()
    if (speakItems == null) {
        currentAudioId = aID
        speakItems = [...document.getElementById(aID).parentNode.parentNode.querySelectorAll('[at]')]
        speakItems.sort(function(a,b) {return parseFloat(a.getAttribute('at'))-parseFloat(b.getAttribute('at'))})
        for (let s of speakItems) {
            s.addEventListener('click', changePlayPosition)
        }
        currentItem = 0
        audioPlayer = document.getElementById(aID)
        audioPlayer.addEventListener("timeupdate", function() {
            var currentTime = audioPlayer.currentTime
			// new code
			let item = currentItem
			if (currentTime > speakItems[currentItem].getAttribute('at')) {
				// forward
				while (item < speakItems.length-1 && speakItems[item+1].getAttribute('at') < currentTime)
					item++
				for (let i = currentItem; i < item; i++)
					speakItems[i].classList.remove('highLight')
				currentItem = item
				speakItems[currentItem].classList.add('highLight')
			}
			else {
				// backward
				while (item > 0 && speakItems[item].getAttribute('at') > currentTime)
					item--
				for (let i = currentItem; i > item; i--)
					speakItems[i].classList.remove('highLight')
				currentItem = item
				speakItems[currentItem].classList.add('highLight')
			}
			/*
			var lastItem = currentItem
            while (currentItem > 0 && currentItem < speakItems.length && speakItems[currentItem].getAttribute('at') > currentTime) {
                speakItems[currentItem].classList.remove('highLight')
                currentItem--
            }
            while (currentItem < speakItems.length && speakItems[currentItem].getAttribute('at') < currentTime) {
				if (currentItem != lastItem)
					//speakItems[currentItem].classList.add('highLight')
					speakItems[lastItem].classList.remove('highLight')
                if (currentItem == speakItems.length - 1) break
				lastItem = currentItem
                currentItem++
            }
			speakItems[currentItem].classList.add('highLight')
			*/
        })
    }
    audioPlayer.currentTime = 0
    changeAudioSpeed(dom.parentNode.querySelector(`select[audioid="${aID}"]`))
    audioPlayer.play()
    dom.value='Pause'
}
function changeAudioSpeed(dom) {
    let speed = dom.value
    if (audioPlayer) {
        audioPlayer.playbackRate = speed
    }
}
