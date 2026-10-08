// MANIFEST: para agregar/quitar/reordenar fotos y videos tocá solo esta lista. Archivos en /public/gallery/
export type MediaItem = {
  id: string; type: 'image' | 'video'; src: string; poster?: string
  primaryCategory: string; tags: string[]            // una misma pieza puede aparecer en varias categorías
  title?: string; text?: string; date?: string; note?: string
  size?: 's' | 'm' | 'l'
  metadata?: Record<string, string>                  // metadata absurda (long press)
  analyze?: string[]                                 // botón [ ANALYZE AUDIO ] (videos)
  special?: { message: string }                      // foto especial: mantener apretada -> confirmación
}
// unlock = id del secreto de la web que abre la categoría (nunca se le explica a Angelena)
export type Category = { id: string; label: string; unlock: string }
export const CATEGORIES: Category[] = [
  { id: 'pulga', label: 'PULGA.EXE', unlock: 'memory' },
  { id: 'soft', label: 'SOFT.DAT', unlock: 'mama' },
  { id: 'danger', label: 'DANGER.DAT', unlock: 'notocar' },
  { id: 'tears', label: 'TEARS.DAT', unlock: 'llorona' },
  { id: 'chaos', label: 'CHAOS.EXE', unlock: 'benicio' },
  { id: 'jeronimo', label: 'JERONIMO.DAT', unlock: 'void' },
  { id: 'food', label: 'FOOD.LORE', unlock: 'combo' },
]
export const SPECIAL = { confirm: 'Are you sure you want to open this file?' }
const J = { SUBJECT: 'JERONIMO', 'THREAT LEVEL': 'UNKNOWN', RELEVANCE: 'CLASSIFIED' }
export const MEDIA: MediaItem[] = [
  { id: 'photo-1', type: 'image', src: '942f14e1.jpg', primaryCategory: 'pulga', tags: ['pulga'], size: 'm', title: 'FILE_001', text: 'Evidence that we occasionally behave normally.' },
  { id: 'photo-2', type: 'image', src: 'c4562b9c.jpg', primaryCategory: 'pulga', tags: ['pulga', 'food'], size: 'l', title: 'FILE_002', text: 'Rare footage of Angelena not crying.' },
  { id: 'photo-3', type: 'image', src: '55a85497.jpg', primaryCategory: 'pulga', tags: ['pulga', 'food'], size: 'm', title: 'FILE_003', text: 'Subject cooking. Fire department on standby.' },
  { id: 'photo-4', type: 'image', src: '8f229e04.jpg', primaryCategory: 'pulga', tags: ['pulga'], size: 'l', title: 'FILE_004', text: 'Subject occupying territory that is not hers.' },
  { id: 'photo-5', type: 'image', src: '4f7d7bdf.jpg', primaryCategory: 'danger', tags: ['danger'], size: 'm' },
  { id: 'photo-6', type: 'image', src: '0396f76e.jpg', primaryCategory: 'danger', tags: ['danger'], size: 's', title: 'FILE_006', text: 'Collateral damage: one back.', special: { message: 'Daños confirmados. La sospechosa lo niega todo.' } },
  { id: 'photo-7', type: 'image', src: '0fc115ce.jpg', primaryCategory: 'danger', tags: ['danger'], size: 'm', title: 'FILE_007', text: 'Movie status: irrelevant.' },
  { id: 'photo-8', type: 'image', src: 'b02eea51.jpg', primaryCategory: 'tears', tags: ['tears'], size: 'l', title: 'FILE_008', text: 'Subject denies everything. Evidence: nose.' },
  { id: 'photo-9', type: 'image', src: '59f8cccb.jpg', primaryCategory: 'soft', tags: ['soft'], size: 'l', title: 'FILE_009', text: 'Location: classified. Lighting: questionable.' },
  { id: 'photo-10', type: 'image', src: '4b77fbfb.jpg', primaryCategory: 'soft', tags: ['soft'], size: 'm', title: 'FILE_010', text: 'Pose: pico de pato. Resultado: aceptable.' },
  { id: 'photo-11', type: 'image', src: '961e4972.jpg', primaryCategory: 'soft', tags: ['soft'], size: 'm', title: 'FILE_011', text: 'Evidence of an incident. Cheek compromised.' },
  { id: 'photo-12', type: 'image', src: 'c187c5b4.jpg', primaryCategory: 'soft', tags: ['soft'], size: 'm', title: 'FILE_012', text: 'Unfortunately, Jerónimo is also in this one.' },
  { id: 'photo-13', type: 'image', src: '3c1b520e.jpg', primaryCategory: 'chaos', tags: ['chaos'], size: 'l', title: 'FILE_013', text: 'Facial expression: pure hatred. Context: cinema.' },
  { id: 'photo-14', type: 'image', src: 'be265d46.jpg', primaryCategory: 'chaos', tags: ['chaos'], size: 'm', title: 'FILE_014', text: 'Both subjects offline.' },
  { id: 'photo-15', type: 'image', src: '279cb63d.jpg', primaryCategory: 'jeronimo', tags: ['jeronimo'], size: 's', title: 'FILE_015', text: 'Subject: Jerónimo. Relevance: classified.', metadata: J },
  { id: 'photo-16', type: 'image', src: '9fc82ecf.jpg', primaryCategory: 'jeronimo', tags: ['jeronimo'], size: 'm', title: 'FILE_016', text: 'Extremely important file. Do not ask why.', metadata: J },
  { id: 'photo-17', type: 'image', src: '5d62f2bf.jpg', primaryCategory: 'jeronimo', tags: ['jeronimo'], size: 's', title: 'FILE_017', text: 'Thumbs up. Approval status: unclear.', metadata: J },
  { id: 'video-1', type: 'video', src: '1634ad07.mp4', poster: '1623504e.jpg', primaryCategory: 'pulga', tags: ['pulga'], title: 'VIDEO_001.mp4', metadata: { SUBJECT: 'PULGA', LOCATION: 'SHOPPING', BEHAVIOR: 'UNCONTROLLED EXPLORATION', THREAT: 'LOW' } },
  { id: 'video-2', type: 'video', src: 'd34d1a8f.mp4', poster: '8b3ba416.jpg', primaryCategory: 'pulga', tags: ['pulga', 'food'], title: 'VIDEO_002.mp4', metadata: { SUBJECT: 'PULGA', BEHAVIOR: 'EATING PANCHOS', THREAT: 'LOW' } },
  { id: 'video-3', type: 'video', src: '03eb8f16.mp4', poster: '45512a6d.jpg', primaryCategory: 'chaos', tags: ['chaos'], title: 'PRAME.EXE', metadata: { SUBJECT: 'ANGELENA', BEHAVIOR: 'UNCONTROLLED', THREAT: 'UNKNOWN' }, analyze: ['AUDIO ANALYSIS', 'Detected phrase:', '❌ PRIME', '✅ PRAME', 'LANGUAGE MODEL: SEVERELY CONCERNED.'] },
]