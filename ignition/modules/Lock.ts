import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const JAN_1ST_2030 = 1893456000;
const ONE_GWEI = BigInt(1_000_000_000);

const LockModule = buildModule("LockModule", (m) => {
  const unlockTime = m.getParameter<number>("unlockTime", JAN_1ST_2030);
  const lockedAmount = m.getParameter<bigint>("lockedAmount", ONE_GWEI);

  const lock = m.contract("Lock", [unlockTime], {
    value: lockedAmount,
  });

  return { lock };
});

export default LockModule;
