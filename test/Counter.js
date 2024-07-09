const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Counter', function () {
    let counter;

    this.beforeEach(async function () {
        const Counter = await ethers.getContractFactory('Counter');
        counter = await Counter.deploy();

    })

    it('Should return the new counter value', async function () {
        expect(await counter.get()).to.equal(0);
    })

    it('Should increment counter value', async function () {
        await counter.inc();
        expect(await counter.get()).to.equal(1);
    })

    it('Should decrement counter value', async function () {
        await counter.inc();
        await counter.dec();
        expect(await counter.get()).to.equal(0);
    })

    it('Should fail to dec if count is below zero', async function () {
        await expect(counter.dec()).to.be.revertedWith('Counter: count is below zero');
    })
})