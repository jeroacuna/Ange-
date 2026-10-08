// Cantidad de corazones necesarios para desbloquear la galería (hay 10 repartidos).
export const HEARTS_TOTAL = 10
// Carpeta pública de las fotos: poné las imágenes en /public/gallery/
export const GALLERY_BASE = '/gallery/'
// true = cada vez que entra, todo arranca de cero (corazones, secretos y nivel).
export const RESET_ON_ENTER = true
// Solo aplica si RESET_ON_ENTER es true: true = la galería (MEMORY.DAT) queda desbloqueada para siempre.
export const KEEP_GALLERY = false