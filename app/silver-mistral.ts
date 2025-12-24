// app/silver-mistral.ts
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { createPublicClient, http, formatEther, isAddress } from "viem";
import { base, baseSepolia } from "viem/chains";

type Network = {
  chain: typeof base;
  chainId: number;
  rpc: string;
  explorer: string;
  label: string;
};

const NETWORKS: Network[] = [
  {
    chain: baseSepolia,
    chainId: 84532,
    rpc: "https://sepolia.base.org",
    explorer: "https://sepolia.basescan.org",
    label: "Base Sepolia",
  },
  {
    chain: base,
    chainId: 8453,
    rpc: "https://mainnet.base.org",
    explorer: "https://basescan.org",
    label: "Base Mainnet",
  },
];

let active = NETWORKS[0];

const sdk = new CoinbaseWalletSDK({
  appName: "Silver Mistral (Built for Base)",
  appLogoUrl: "https://base.org/favicon.ico",
});

const out = document.createElement("pre");
out.style.background = "#0b0f1a";
out.style.color = "#dbe7ff";
out.style.padding = "14px";
out.style.borderRadius = "12px";
out.style.minHeight = "380px";

function print(lines: string[]) {
  out.textContent = lines.join("\n");
}

function client() {
  return createPublicClient({ chain: active.chain, transport: http(active.rpc) });
}

async function connectWallet() {
  const provider = sdk.makeWeb3Provider(active.rpc, active.chainId);
  const accounts = (await provider.request({ method: "eth_requestAccounts" })) as string[];
  const address = accounts?.[0];
  if (!address) throw new Error("No address returned");

  const chainHex = (await provider.request({ method: "eth_chainId" })) as string;
  const balance = await client().getBalance({ address: address as `0x${string}` });

  print([
    "Wallet connected",
    `Network: ${active.label}`,
    `chainId: ${parseInt(chainHex, 16)}`,
    `Address: ${address}`,
    `ETH balance: ${formatEther(balance)} ETH`,
    `Explorer: ${active.explorer}/address/${address}`,
  ]);
}

async function snapshot() {
  const c = client();
  const [blockNumber, gasPrice, block] = await Promise.all([
    c.getBlockNumber(),
    c.getGasPrice(),
    c.getBlock(),
  ]);

  print([
    "Snapshot",
    `Network: ${active.label}`,
    `Latest block: ${blockNumber}`,
    `Timestamp: ${block.timestamp}`,
    `Gas price (wei): ${gasPrice.toString()}`,
    `Gas used: ${block.gasUsed}`,
    `Gas limit: ${block.gasLimit}`,
    `${active.explorer}/block/${blockNumber}`,
  ]);
}

async function inspectAddress(address: string) {
  if (!isAddress(address)) throw new Error("Invalid address");
  const [balance, nonce] = await Promise.all([
    client().getBalance({ address: address as `0x${string}` }),
    client().getTransactionCount({ address: address as `0x${string}` }),
  ]);

  print([
    "Address inspection",
    `Network: ${active.label}`,
    `Address: ${address}`,
    `ETH balance: ${formatEther(balance)} ETH`,
    `Transaction count: ${nonce}`,
    `${active.explorer}/address/${address}`,
  ]);
}

function toggleNetwork() {
  active = active.chainId === 84532 ? NETWORKS[1] : NETWORKS[0];
  print([`Switched to ${active.label}. Reconnect wallet to refresh session.`]);
}

function mount() {
  const root = document.createElement("div");
  root.style.maxWidth = "1080px";
  root.style.margin = "24px auto";
  root.style.fontFamily = "system-ui";

  const h1 = document.createElement("h1");
  h1.textContent = "Silver Mistral";

  const controls = document.createElement("div");
  controls.style.display = "flex";
  controls.style.flexWrap = "wrap";
  controls.style.gap = "10px";
  controls.style.marginBottom = "12px";

  function btn(label: string, fn: () => void | Promise<void>) {
    const b = document.createElement("button");
    b.textContent = label;
    b.onclick = () => Promise.resolve(fn()).catch((e) => print([String(e)]));
    return b;
  }

  const addrInput = document.createElement("input");
  addrInput.placeholder = "0x… address";
  addrInput.style.minWidth = "400px";

  controls.append(
    btn("Connect Wallet", connectWallet),
    btn("Toggle Network", toggleNetwork),
    btn("Snapshot", snapshot),
  );

  root.append(
    h1,
    controls,
    addrInput,
    btn("Inspect Address", () => inspectAddress(addrInput.value)),
    out,
  );

  document.body.appendChild(root);
  print(["Ready", `Active network: ${active.label}`, "Read-only mode enabled"]);
}

mount();
