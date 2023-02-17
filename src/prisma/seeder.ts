import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  await prisma.worker.deleteMany({});
  await prisma.rawMaterial.deleteMany({});
  // Create workers
  const workerData = [
    { name: "John Doe", phone: "1234567890", address: "123 Main St" },
    { name: "Jane Smith", phone: "0987654321", address: "456 Oak Ave" },
    { name: "Bob Johnson", phone: "5555555555", address: "789 Elm St" },
    { name: "Samantha Williams", phone: "1112223333", address: "321 Maple Rd" },
    { name: "Michael Brown", phone: "4443332222", address: "555 Pine Ave" },
  ];

  const workers = await Promise.all(
    workerData.map((worker) => {
      return prisma.worker.create({ data: worker });
    })
  );

  console.log(`Created ${workers.length} workers.`);

  // Create raw materials
  const rawMaterialData = [
    { name: "Acacia wood", type: "Wood", quantity: 1000 },
    { name: "Sheesham wood", type: "Wood", quantity: 1500 },
    { name: "Rosewood", type: "Wood", quantity: 800 },
    { name: "Teak wood", type: "Wood", quantity: 1200 },
    { name: "Bamboo stick", type: "Bamboo", quantity: 2000 },
    { name: "Palm leaf", type: "Bamboo", quantity: 2500 },
    { name: "Cane", type: "Bamboo", quantity: 1800 },
    { name: "Coconut shell", type: "Shell", quantity: 3000 },
    { name: "Mother of pearl", type: "Shell", quantity: 150 },
    { name: "Conch shell", type: "Shell", quantity: 200 },
    { name: "Marble dust", type: "Stone", quantity: 2500 },
    { name: "Soapstone", type: "Stone", quantity: 1800 },
    { name: "Granite", type: "Stone", quantity: 2000 },
    { name: "Brass sheet", type: "Metal", quantity: 800 },
    { name: "Copper sheet", type: "Metal", quantity: 500 },
    { name: "Bronze sheet", type: "Metal", quantity: 600 },
    { name: "Terracotta clay", type: "Clay", quantity: 3000 },
    { name: "Red clay", type: "Clay", quantity: 2000 },
    { name: "White clay", type: "Clay", quantity: 2200 },
    { name: "Tussar silk", type: "Textile", quantity: 600 },
    { name: "Katan silk", type: "Textile", quantity: 800 },
    { name: "Cotton", type: "Textile", quantity: 3000 },
    { name: "Kosa silk", type: "Textile", quantity: 700 },
    { name: "Banarasi silk", type: "Textile", quantity: 900 },
    { name: "Leather", type: "Animal", quantity: 1000 },
    { name: "Bone", type: "Animal", quantity: 300 },
    { name: "Horn", type: "Animal", quantity: 250 },
  ];

  const rawMaterials = await Promise.all(
    rawMaterialData.map((rawMaterial) => {
      return prisma.rawMaterial.create({ data: rawMaterial });
    })
  );

  console.log(`Created ${rawMaterials.length} raw materials.`);

  //   // Create assemblies
  //   const assemblyData = [
  //     { workerId: workers[0].id, rawMaterialAssemblies: {
  //         create: [
  //           { rawMaterialId: rawMaterials[0].id, quantity: 10 },
  //           { rawMaterialId: rawMaterials[1].id, quantity: 50 },
  //         ]
  //       }
  //     },
  //     { workerId: workers[1].id, rawMaterialAssemblies: {
  //         create: [
  //           { rawMaterialId: rawMaterials[0].id, quantity: 20 },
  //           { rawMaterialId: rawMaterials[2].id, quantity: 100 },
  //         ]
  //       }
  //     },
  //     { workerId: workers[2].id, rawMaterialAssemblies: {
  //         create: [
  //           { rawMaterialId: rawMaterials[3].id, quantity: 10 },
  //           { rawMaterialId: rawMaterials[4].id, quantity: 25 },
  //           { rawMaterialId: rawMaterials[5].id, quantity: 15 },
  //         ]
  //       }
  //     },
  //   ]

  //   const assemblies = await Promise.all(assemblyData.map(assembly => {
  //     return prisma.assembly.create({ data: assembly })
  //   }))

  //   console.log(`Created ${assemblies.length} assemblies.`)
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
