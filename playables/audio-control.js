// Load before a playable's game code so the preview can mute its audio.
(() => {
    let muted = false;
    const contexts = new Set();
    for (const name of ["AudioContext", "webkitAudioContext"]) {
        const Native = window[name];
        if (!Native) continue;
        const resume = Native.prototype.resume;
        if (resume && !Native.prototype.__playableMutePatched) {
            Native.prototype.resume = function (...args) {
                return muted ? Promise.resolve() : resume.apply(this, args);
            };
            Native.prototype.__playableMutePatched = true;
        }
        function Tracked(...args) {
            const context = Reflect.construct(Native, args, new.target || Native);
            contexts.add(context);
            if (muted) context.suspend();
            return context;
        }
        Tracked.prototype = Native.prototype;
        Object.setPrototypeOf(Tracked, Native);
        window[name] = Tracked;
    }
    const media = new Set();
    const play = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function (...args) {
        media.add(this);
        if (muted) this.muted = true;
        return play.apply(this, args);
    };
    window.addEventListener("message", event => {
        if (event.source !== window.parent ||
            event.data?.type !== "playable-audio-mute") return;
        muted = !!event.data.muted;
        for (const context of contexts) {
            if (context.state === "closed") continue;
            if (muted) context.suspend();
            else context.resume();
        }
        for (const element of document.querySelectorAll("audio, video")) media.add(element);
        for (const element of media) element.muted = muted;
    });
    window.parent.postMessage({ type: "playable-audio-ready" }, "*");
})();
