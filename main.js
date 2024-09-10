

const qualifiedAdd = [
    '0x9bb55840c8307fe749a5b98b472f6cabcae5c2ee',
    '0xef7c3e98ba3370a5e86e03e24143f84575c5663e',
    '0xee0e1f3c1a5f688771ff0fc65767f6efcf4dc166'
].map(x =>  CryptoJS.SHA256(x))
const tree = new MerkleTree(qualifiedAdd,  CryptoJS.SHA256)
const root = tree.getRoot().toString('hex')
const leaf =  CryptoJS.SHA256('a')
const proof = tree.getProof(leaf)

function checkQualification(userAdd) {
    const hashedAddress = CryptoJS.SHA256(userAdd).toString();
    const proof = tree.getProof(hashedAddress);
    const validation = tree.verify(proof, hashedAddress, root);
      return validation;

}

document.getElementById('check-qualification').addEventListener('click', () => {
    const userAddress = document.getElementById('user-address').value;
    const resultDiv = document.getElementById('result');

    
    if ( checkQualification(userAddress)) {
      resultDiv.textContent = "Eligible for airdrop";
      resultDiv.style.color = 'green';
    } else {
      resultDiv.textContent = "Not eligible for airdrop";
      resultDiv.style.color = 'red';
    }
  });

  document.getElementById('clear-button').addEventListener('click', () => {
    const userAddressInput = document.getElementById('user-address');
    userAddressInput.value = ''; 
    document.getElementById('result').textContent = ''; 
  });


