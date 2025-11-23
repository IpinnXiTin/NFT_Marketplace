# TODO: Fix IPFS Upload Issue by Switching to NFT.Storage

## Steps to Complete:
- [ ] Remove `ipfs-http-client` from `nft-marketplace-frontend/package.json`
- [ ] Update `nft-marketplace-frontend/context/NFTMarketplaceContext.tsx`:
  - [ ] Remove import of `create` from "ipfs-http-client"
  - [ ] Remove IPFS client creation code
  - [ ] Modify `uploadToIPFS` function to use NFT.Storage API for file uploads
  - [ ] Modify metadata upload in `createNFT` function to use NFT.Storage for JSON
- [ ] Run `npm install` in `nft-marketplace-frontend` to update dependencies
- [ ] Test upload functionality (run dev server and verify uploads work)
