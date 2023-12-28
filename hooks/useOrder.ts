import { BN } from "bn.js";
import { useCallback, useContext } from "react";
import { erc20Abi, erc721Abi, exchangeAbi, proxyRegistryAbi } from "../abi";
import {
  acceptOffer,
  generateBuyOrder,
  generateOfferOrder,
  generateSellOrder,
  getProxyAddress,
  verifyBuyOrder,
  verifyOfferOrder,
  verifySellOrder,
} from "../api";
import { WalletContext } from "../contexts";

const PROXY_REGISTRY_CONTRACT_ADDRESS =
  "0x54378434e3a96f0FdC79D60B2C2264E769E159Be";

const EXCHANGE_ADDRESS = "0x10820ADdfD1E0e02fB3C682b8c1BEd5201BD004c";

const WETH_CONTRACT_ADDRESS = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"; //✅

const CHAIN_ID = 5;

export interface SolidityOrder {
  exchange: string;
  maker: string;
  taker: string;
  saleSide: number;
  saleKind: number;
  target: string;
  paymentToken: string;
  calldata_: string;
  replacementPattern: string;
  staticTarget: string;
  staticExtra: string;
  basePrice: string;
  endPrice: string;
  listingTime: number;
  expirationTime: number;
  salt: string;
}

//주문 서명
const signOrder = async (web3: any, account: string, order: SolidityOrder) => {
  const orderType = [
    { name: "exchange", type: "address" },
    { name: "maker", type: "address" },
    { name: "taker", type: "address" },
    { name: "saleSide", type: "uint8" },
    { name: "saleKind", type: "uint8" },
    { name: "target", type: "address" },
    { name: "paymentToken", type: "address" },
    { name: "calldata_", type: "bytes" },
    { name: "replacementPattern", type: "bytes" },
    { name: "staticTarget", type: "address" },
    { name: "staticExtra", type: "bytes" },
    { name: "basePrice", type: "uint256" },
    { name: "endPrice", type: "uint256" },
    { name: "listingTime", type: "uint256" },
    { name: "expirationTime", type: "uint256" },
    { name: "salt", type: "uint256" },
  ];

  const result = await web3.givenProvider.request({
    method: "eth_signTypedData_v4",
    params: [
      account,
      JSON.stringify({
        domain: {
          chainId: CHAIN_ID,
          name: "Wyvern Clone Coding Exchange",
          verifyingContract: EXCHANGE_ADDRESS,
          version: "1",
        },
        message: order,
        primaryType: "Order",
        types: {
          EIP712Domain: [
            { name: "name", type: "string" },
            { name: "version", type: "string" },
            { name: "chainId", type: "uint256" },
            { name: "verifyingContract", type: "address" },
          ],
          Order: orderType,
        },
      }),
    ],
  });

  return result;
};

export const useOrder = () => {
  const { web3, login, account } = useContext(WalletContext);

  const proxyRegistryContract = web3
    ? new web3.eth.Contract(
        proxyRegistryAbi as any,
        PROXY_REGISTRY_CONTRACT_ADDRESS
      )
    : null;

  const exchangeContract = web3
    ? new web3.eth.Contract(exchangeAbi as any, EXCHANGE_ADDRESS)
    : null;

  //로그인 여부를 체크인하기
  const checkLogin = useCallback(async () => {
    //web3객체가 있으면 로그인 true반환, 없으면 false
    if (!web3) {
      login();
      return false;
    }

    return true;
  }, [login, web3]);

  //프록시 컨트랙트 생성여부 체크
  const hasProxy = useCallback(async () => {
    if (!web3) {
      login();
      return;
    }

    const result = await getProxyAddress(account);

    //프록시 주소가 null인지 체크
    return result.data.proxy !== "0x0000000000000000000000000000000000000000";
  }, [web3, login, account]);

  //프록식 registery 컨트랙트에 유저의 프록시 컨트랙트 생성하기
  const registerProxy = () => {
    if (!web3) {
      login();
      return;
    }

    return proxyRegistryContract?.methods
      .registerProxy()
      .send({ from: account });
  };

  //지갑주소가 프록시 컨트랙트에 토큰사용을 승인 하였는지 확인
  const isApprovedForAll = async (contract: string) => {
    if (!web3) {
      return login();
    }

    //토큰 컨트랙트 가져오기
    const tokenContract = new web3.eth.Contract(erc721Abi as any, contract);

    //현재 지값주소의 프록시 주소 가져오기
    const proxyAddress = await proxyRegistryContract?.methods
      .proxies(account)
      .call();

    //현재 지갑주소가 프록시 컨트랙트에 토큰사용을 승인 하였는지 확인
    return await tokenContract.methods
      .isApprovedForAll(account, proxyAddress)
      .call();
  };

  //현재 지갑주소로 프록시 컨트랙트에 토큰사용 승인하기
  const setApprovalForAll = (contract: string) => {
    if (!web3) {
      return login();
    }

    //토큰 컨트랙트 가져오기
    const tokenContract = new web3.eth.Contract(erc721Abi as any, contract);

    //현재 지값주소의 프록시 주소 가져온 후 프록시 컨트랙트에 토큰사용 승인하기
    return proxyRegistryContract?.methods
      .proxies(account)
      .call()
      .then((proxyAddress: string) => {
        return tokenContract.methods
          .setApprovalForAll(proxyAddress, true)
          .send({ from: account });
      });
  };

  const sellOrder = async (
    contract: string,
    tokenId: string,
    price: string,
    expirationTime: number
  ) => {
    if (!web3) {
      return login();
    }

    //백앤드 판매 주문 생성 api 호출
    const order = await generateSellOrder({
      maker: account, //현재주소
      contract,
      tokenId,
      price,
      expirationTime,
    });

    //주문을 eip712 방식으로 서명
    const sig = await signOrder(web3, account, JSON.parse(order.data.raw));
    //서명 검증 api 호출
    const sigResult = await verifySellOrder(order.data.id, sig);
  };

  //판매 주문을 받아서 대응되는 구매 주문 생성
  const buyOrder = async (sellOrder: any) => {
    if (!web3) {
      return login();
    }

    //구매 주문 생성 api 호출
    const buyOrderResult = await generateBuyOrder({
      orderId: sellOrder.id,
      maker: account,
    });

    //주문을 eip712 방식으로 서명
    const sig = await signOrder(web3, account, buyOrderResult.data);
    //구매 주문 서명 검증 api 호출
    const sigResult = await verifyBuyOrder(buyOrderResult.data, sig);

    const price = new BN(buyOrderResult.data.basePrice.replace(/0x0+/, ""), 16);
    const fee = price.divn(40);

    //주문 실행
    return await exchangeContract?.methods
      .atomicMatch(
        toSolidityOrder(buyOrderResult.data),
        toSoliditySig(sig),
        toSolidityOrder(JSON.parse(sellOrder.raw)),
        toSoliditySig(sellOrder.signature)
      ) //데이터를 배열형태로 넣기
      .send({
        from: account,
        value: price.add(fee),
      });
  };

  //✅weth 를 거래컨트랙트에 approve된 토큰양이 0보다 큰지 체크
  const hasWETHAllowance = async () => {
    if (!web3) {
      return login();
    }

    const erc20Contract = new web3.eth.Contract(
      erc20Abi as any,
      WETH_CONTRACT_ADDRESS
    );

    const allowance = await erc20Contract.methods
      .allowance(account, EXCHANGE_ADDRESS)
      .call();

    if (allowance === "0") {
      return false;
    }

    return true;
  };

  //✅weth를 approve 하기
  const approveAllWETH = async () => {
    if (!web3) {
      return login();
    }

    const erc20Contract = new web3.eth.Contract(
      erc20Abi as any,
      WETH_CONTRACT_ADDRESS
    );

    return await erc20Contract.methods
      .approve(
        EXCHANGE_ADDRESS,
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" //uint256최대금액 만큼 허용
      )
      .send({ from: account });
  };

  //✅ offer 생성
  const generateOffer = async (
    contract: string,
    tokenId: string,
    price: string,
    expirationTime: number
  ) => {
    if (!web3) {
      return login();
    }

    //offer 생성 api 호출
    const order = await generateOfferOrder({
      maker: account,
      contract,
      tokenId,
      price,
      expirationTime,
    });

    //주문을 eip712 방식으로 서명
    const sig = await signOrder(web3, account, JSON.parse(order.data.raw));
    //구매 주문 서명 검증 api 호출
    const sigResult = await verifyOfferOrder(order.data.id, sig);
  };

  //offer 주문 수락
  const acceptOfferOrder = async (order: any) => {
    if (!web3) {
      return login();
    }

    //api를 호출하여 offer에 대응되는 판매주문 생성
    const offerAcceptResult = await acceptOffer({
      orderId: order.id,
      maker: account,
    });

    //주문을 eip712 방식으로 서명
    const sig = await signOrder(web3, account, offerAcceptResult.data);
    //구매 주문 서명 검증 api 호출
    const sigResult = await verifyBuyOrder(offerAcceptResult.data, sig);

    //주문 실행
    return await exchangeContract?.methods
      .atomicMatch(
        toSolidityOrder(JSON.parse(order.raw)),
        toSoliditySig(order.signature),
        toSolidityOrder(offerAcceptResult.data),
        toSoliditySig(sig)
      )
      .send({ from: account });
  };

  return {
    checkLogin,
    hasProxy,
    registerProxy,
    isApprovedForAll,
    setApprovalForAll,
    sellOrder,
    buyOrder,
    hasWETHAllowance,
    approveAllWETH,
    generateOffer,
    acceptOfferOrder,
  };
};

//주문 데이터를 배열 형대로 바꾸기
function toSolidityOrder(order: any) {
  return [
    order.exchange,
    order.maker,
    order.taker,
    order.saleSide,
    order.saleKind,
    order.target,
    order.paymentToken,
    order.calldata_,
    order.replacementPattern,
    order.staticTarget,
    order.staticExtra,
    order.basePrice,
    order.endPrice,
    order.listingTime,
    order.expirationTime,
    order.salt,
  ];
}

//서명을 배열 형태로 바꾸기
function toSoliditySig(sig: string) {
  const sigWithoutPrefix = sig.replaceAll("0x", "");

  return [
    `0x${sigWithoutPrefix.slice(0, 64)}`,
    `0x${sigWithoutPrefix.slice(64, 128)}`,
    `0x${sigWithoutPrefix.slice(128, 130)}`,
  ];
}
