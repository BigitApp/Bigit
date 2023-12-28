import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { TopHeader } from "../../../components";
import { useNftContract, useNfts } from "../../../hooks";

const List: NextPage = () => {
  //router로 지갑 주소 가져오기
  const router = useRouter();
  const { address } = router.query;

  //hooks
  const { data: contract } = useNftContract(address);
  const { data: nfts, hasNextPage, fetchNextPage } = useNfts(address);

  return (
    <div>
      <TopHeader />

      <Container>
        {/* 컨트랙트 있을시 컨트랙트 정보 랜더링 */}
        {contract && (
          <>
            <ContractImage src={contract.image} />
            <ContractTitle>
              {/* 대문자 있을시 띄어쓰기 */}
              {contract.name?.replace(/([A-Z])/g, " $1")}
            </ContractTitle>
            <ContractMetadata>
              Total : <b>{contract.totalSupply}</b>
            </ContractMetadata>
            <ContractDescription>{contract.description}</ContractDescription>
          </>
        )}

        <Grid container spacing={2}>
          {/* 1페이지 당 백개 nft데이타가 있음 */}
          {nfts?.pages.map((page) => {
            return page.result.map((nft: any) => (
              <Grid key={`${address}-nft-${nft.tokenId}`} item xs={3}>
                {/* 토큰 클릭시 상세페이지로 넘어감 */}
                <Link
                  href={`/list/${address}/${parseInt(nft.tokenId, 16)}`} //토큰아이디는 16진수를 10진수로 변환
                >
                  <NftContainer>
                    <NftImage src={nft.image} />
                    <NftInfo>
                      <TokenId>#{parseInt(nft.tokenId, 16)}</TokenId>
                      <TokenPrice>10.000 ETH</TokenPrice>
                    </NftInfo>
                  </NftContainer>
                </Link>
              </Grid>
            ));
          })}
        </Grid>

        {/* 다음 페이지가 있을시 다음페이지 데이타 호출 */}
        {hasNextPage && <More onClick={() => fetchNextPage()}>More</More>}
      </Container>
    </div>
  );
};

const Container = styled.div`
  padding: 24px 80px;
`;

const ContractImage = styled.img`
  width: 192px;
  height: 192px;
  border-radius: 12px;
`;

const ContractTitle = styled.div`
  margin-top: 8px;
  font-size: 32px;
  font-weight: 800;
`;

const ContractMetadata = styled.div`
  margin-top: 16px;
`;

const ContractDescription = styled.div`
  margin-top: 16px;
  padding: 18px 24px;
  background: #f0f0f0;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 40px;
`;

const NftContainer = styled.div``;

const NftImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;

const NftInfo = styled.div`
  padding: 8px 4px 24px;
`;

const TokenId = styled.div`
  font-size: 16px;
`;

const TokenPrice = styled.div`
  margin-top: 8px;
  font-weight: 800;
  font-size: 18px;
`;

const More = styled.div`
  background: #f0f0f0;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 60px;
  text-align: center;
  cursor: pointer;
`;

export default List;
