import Web3 from "web3";
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
  useCallback,
} from "react";
import Axios from "axios";

declare const window: any;
declare const ethereum: any;

interface IWalletContext {
  web3: Web3 | null;
  account: string;
  login: () => void;
}

export const WalletContext = createContext<IWalletContext>({
  web3: null,
  account: "",
  login: () => {},
});

const axios = Axios.create({
  baseURL: "http://localhost:3000",
});

export const WalletContextProvider = ({ children }: PropsWithChildren) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const login = useCallback(async () => {
    if (typeof window.ethereum === "undefined") {
      console.log("metamask not installed");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];

    const web3 = new Web3(window.ethereum);
    setWeb3(web3);

    //서버 호출하여 서명메세지 받기
    const authRequest = await axios.get(`/auth/${account.replace("0x", "")}`);

    //서명요청
    const result = await web3.eth.personal.sign(
      authRequest.data.message,
      account,
      ""
    );

    //백앤드 서명 검증 api 호출하여 accesstoken 받기
    const authResult = await axios.post("/auth/verify", {
      id: authRequest.data.id,
      signature: result,
    });
    setAccessToken(authResult.data.accessToken);

    //로그인 성공 시 로그인 된 계정 주소를 셋팅
    setAccount(account);
  }, []);

  //✅지갑 계정 변경 시 다시 로그인 하는 기능 추가
  useEffect(() => {
    if (web3) {
      //계정과 토큰 리셋 및 로그인 함수 호출
      const reset = () => {
        setAccount("");
        setAccessToken("");
        login();
      };

      //지갑 변경 시 reset함수 호출
      const event = window?.ethereum.on("accountsChanged", reset);

      //기존에 있던 accountsChanged 이벤트 제거
      return () => window?.ethereum.removeListener("accountsChanged", reset);
    }
  }, [web3, login]);

  return (
    <WalletContext.Provider value={{ web3, account, login }}>
      {children}
    </WalletContext.Provider>
  );
};
