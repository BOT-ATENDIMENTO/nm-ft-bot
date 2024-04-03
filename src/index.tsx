import("./bootstrap");
import("./bootstrap")
  .then((res) => console.log("bootstraped", res))
  .catch((error) => console.error("error", error));
