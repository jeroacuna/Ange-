// Para agregar, sacar o reordenar fotos: tocá solo esta lista. Las imágenes van en /public/gallery/
export type Photo = {
  src: string; title?: string; text?: string; date?: string; note?: string
  size?: 's' | 'm' | 'l'
  special?: { message: string } // foto especial: mantener apretada -> pide confirmación
}
export const SPECIAL = { confirm: 'Are you sure you want to open this file?' }
export const PHOTOS: Photo[] = [
  { src: '942f14e1.jpg', title: 'FILE_001', text: 'Evidence that we occasionally behave normally.', size: 'm' },
  { src: 'c4562b9c.jpg', title: 'FILE_002', text: 'Rare footage of Angelena not crying.', size: 'l' },
  { src: '7f84aa2a.jpg', title: 'FILE_003', text: 'Scale reference: enana.', size: 's' },
  { src: 'c187c5b4.jpg', title: 'FILE_004', text: 'Unfortunately, Jerónimo is also in this one.', size: 'm' },
  { src: '59f8cccb.jpg', title: 'FILE_005', text: 'Location: classified. Lighting: questionable.', size: 'l' },
  { src: 'a3b90540.jpg', title: 'FILE_006', text: 'Jerónimo durmiendo. Angelena con otros planes.', size: 'm' },
  { src: '961e4972.jpg', title: 'FILE_007', text: 'Evidence of an incident. Cheek compromised.', size: 'm' },
  { src: '4b77fbfb.jpg', title: 'FILE_008', text: 'Pose: pico de pato. Resultado: aceptable.', size: 'l' },
  { src: '4f7d7bdf.jpg', size: 'm' },
  { src: '34d28575.jpg', title: 'FILE_010', text: 'Subject: Jerónimo. Nobody asked for this.', size: 's' },
  { src: '549943e3.jpg', title: 'FILE_011', text: 'Classified.', size: 'm', special: { message: 'Te dije que era clasificado. Igual lo abriste. Típico.' } },
]