// Fælles triage-funktion til status-beregning
// Brug altid tal til sammenligning!
export function triageStatus({ weight, pulse, spo2 }) {
    weight = Number(weight);
    pulse = Number(pulse);
    spo2 = Number(spo2);
    if (spo2 < 90 || pulse > 120 || pulse < 40) return 'red';
    if (spo2 < 95 || pulse > 100 || pulse < 50) return 'yellow';
    return 'green';
} 