import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getContract,
  getNfts,
  getNftTransferHistory,
  getOneNft,
  getNftSellOrders,
  getNftOfferLists,
} from "../api";

//컨트랙트 주소가 있을시 api로 서버에서 컨트랙트 데이터 받아오기
export function useNftContract(contractAddress: any) {
  return useQuery(
    ["nft", "contract", contractAddress],
    async () => {
      if (!contractAddress) {
        return {};
      }

      const result = await getContract(contractAddress);

      return result.data;
    },
    {
      retry: false, //api 호출 결과 에러 시 재시도 안함
    }
  );
}

export function useNfts(contractAddress: any) {
  //useInfiniteQuery로 스크롤시 계속 이미지 보여주는 인피니트 스크롤 구현
  return useInfiniteQuery(
    ["nft", "contract", contractAddress, "tokens"],
    async ({ pageParam }) => {
      const result = await getNfts(contractAddress, pageParam);

      return result.data;
    },
    {
      //다음페이지 요청시 netxtoken값을 pageparam으로 넣어 다음 페이지 데이터 로딩
      getNextPageParam: (lastPage) => {
        return lastPage.nextToken;
      },
    }
  );
}

export function useOneNft(contractAddress: any, tokenId: any) {
  return useQuery(
    ["nft", "contract", contractAddress, "tokens", tokenId],
    async () => {
      const result = await getOneNft(contractAddress, tokenId);

      return result.data;
    },
    {
      retry: false,
    }
  );
}

export function useNftTransferHistory(contractAddress: any, tokenId: any) {
  return useQuery(
    ["nft", "contract", contractAddress, "tokens", tokenId, "history"],
    async () => {
      const result = await getNftTransferHistory(contractAddress, tokenId);

      return result.data;
    },
    {
      retry: false,
    }
  );
}

//판매 주문 리스트 가져오기
export function useNftSellOrders(contractAddress: any, tokenId: any) {
  return useQuery(
    ["nft", contractAddress, tokenId, "sell-orders"],
    async () => {
      if (!contractAddress || !tokenId) {
        return null;
      }

      const result = await getNftSellOrders(contractAddress, tokenId);
      return result.data;
    },
    {
      retry: false,
    }
  );
}

//offer리스트 가져오기
export function useNftOffers(contractAddress: any, tokenId: any) {
  return useQuery(
    ["nft", contractAddress, tokenId, "offers"],
    async () => {
      if (!contractAddress || !tokenId) {
        return null;
      }

      const result = await getNftOfferLists(contractAddress, tokenId);
      return result.data;
    },
    {
      retry: false,
    }
  );
}
