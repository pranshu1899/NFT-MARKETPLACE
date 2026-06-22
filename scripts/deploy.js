// import { ethers } from "hardhat";

// async function main() {
//     const MyNFT = await ethers.getContractFactory("MyNFT");

// const myNFT = await MyNFT.deploy();
// await myNFT.waitForDeployment();

// console.log(
//     await myNFT.getAddress()
// );

// const Marketplace = await ethers.getContractFactory("NFTMarketplace");

// const marketplace = await Marketplace.deploy();
// await marketplace.waitForDeployment();
// }
// main().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
// });

import hre from "hardhat";

async function main() {

    const { ethers } =
        await hre.network.connect();

    const MyNFT =
        await ethers.getContractFactory(
            "MyNFT"
        );

    const myNFT =
        await MyNFT.deploy();

    await myNFT.waitForDeployment();

    console.log(
        "NFT:",
        await myNFT.getAddress()
    );

    const Marketplace =
        await ethers.getContractFactory(
            "NFTMarketplace"
        );

    const marketplace =
        await Marketplace.deploy();

    await marketplace.waitForDeployment();

    console.log(
        "Marketplace:",
        await marketplace.getAddress()
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});