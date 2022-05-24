const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address)

    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );

    console.log( 
        "contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
        );

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave("New incoming message");
    await waveTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );


    let waves = await waveContract.getAllWaves();

    console.log(waves)

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave("Message from random person");
    await waveTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    waveTxn = await waveContract.wave("New incoming message");
    await waveTxn.wait();

    waves = await waveContract.getAllWaves();

    console.log(waves)

    waveCount = await waveContract.getTotalWaves();

    waversList = await waveContract.getWavers();

  };
  

const runMain = async () => {
try {
    await main();
    process.exit(0); // exit Node process without error
} catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
}
// Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};
  
runMain();