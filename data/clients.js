// Real clients. Add an object to add a client; the grid layout adapts on its own.
// Project ↔ client link: project.clientId === client.id
export const clients = [
  { id: "faces-by-gauri", name: "Faces by Gauri", logo: "/clients/faces-by-gauri.svg", website: "https://facesbygauri.com/" },
  { id: "ritu-mahajan-makeovers", name: "Ritu Mahajan Makeovers", logo: "/clients/ritu-mahajan-makeovers.svg", website: "https://www.ritumahajanmakeovers.com/" },
  { id: "mahajan-furniture-house", name: "Mahajan Furniture House", logo: "/clients/mahajan-furniture-house.svg", website: "https://www.mahajanfurniturehouse.com/" },
  { id: "golden-crust", name: "Golden Crust", logo: "/clients/golden-crust.svg" },
];

export const getClient = (id) => clients.find((c) => c.id === id);
