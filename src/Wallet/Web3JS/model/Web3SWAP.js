import PolygonMumbai_Tether_USD_ABI from"../../ABI/PolygonMumbai_Tether_USD_ABI.json"

export const Web3SWAP =(Address)=>{
    const web3 = new Web3(Web3.givenProvider)      
    contractAddress= "0x3813e82e6f7098b9583FC0F33a962D02018B6803"
    const contract = new web3.eth.Contract(PolygonMumbai_Tether_USD_ABI, contractAddress)

    contract
}

