export const getCurrentDate = () => new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const args = process.argv.slice(2);
export const getArg = (arg) => {
    const argIndex = args.indexOf(arg);
    return argIndex > -1 ? args[argIndex + 1] : null;
}