
import Repository from "@/repositories/Repository";

const token = localStorage.getItem('token');

export default {

  coinTrxList() {
    return Repository.get('/coins', {
        headers: {
            Accept: "application/json",
            Authorization: 'Bearer ' + token,
        }
    });
  },
  coinTrxDetail(trx_id){
    return Repository.get('/coins/' + trx_id, {
        headers: {
            Accept: "application/json",
            Authorization: 'Bearer ' + token,
        }
    });
  },
  marksForCoinsList(){
    return Repository.get('/students/marks-for-coins', {
        headers: {
            Accept: "application/json",
            Authorization: 'Bearer ' + token,
        }
    });
  },
  marksForCoinsDetail(mark_id){
    return Repository.get('/students/marks-for-coins/' + mark_id, {
        headers: {
            Accept: "application/json",
            Authorization: 'Bearer ' + token,
        }
    });
  },
  marksForCoinsAttempt(mark_id){
    return Repository.post('/students/redeem-marks-for-coins/' + mark_id, {
        headers: {
            Accept: "application/json",
            Authorization: 'Bearer ' + token,
        }
    });
  },
}