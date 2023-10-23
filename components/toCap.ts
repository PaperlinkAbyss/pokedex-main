export default function toCap(toCap: string) {
  return toCap?.charAt(0).toUpperCase() + toCap?.slice(1)
}
