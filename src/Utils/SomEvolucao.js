let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function tocarNota(ctx, frequencia, tempoInicio, duracao, volume = 0.15) {
  const oscilador = ctx.createOscillator();
  const ganho = ctx.createGain();

  oscilador.type = "triangle";
  oscilador.frequency.setValueAtTime(frequencia, tempoInicio);

  ganho.gain.setValueAtTime(0, tempoInicio);
  ganho.gain.linearRampToValueAtTime(volume, tempoInicio + 0.02);
  ganho.gain.exponentialRampToValueAtTime(0.001, tempoInicio + duracao);

  oscilador.connect(ganho);
  ganho.connect(ctx.destination);

  oscilador.start(tempoInicio);
  oscilador.stop(tempoInicio + duracao);
}

export function tocarSomEvolucao() {
  const ctx = getAudioContext();
  const agora = ctx.currentTime;

  const notas = [523.25, 659.25, 783.99, 1046.5];
  const intervalo = 0.09;

  notas.forEach((freq, i) => {
    tocarNota(ctx, freq, agora + i * intervalo, 0.35);
  });
}