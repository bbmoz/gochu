function stripCwd (path: string) {
  return path.slice(process.cwd().length + 1)
}

export {
  stripCwd
}
