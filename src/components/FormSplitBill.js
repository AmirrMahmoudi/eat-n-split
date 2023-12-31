import { useState } from "react";
import { Button } from "./";

const FormSplitBill = ({ selectedFriend, onSplitBill }) => {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const re = /^[0-9\b]+$/; // regex to allow numbers and backspace

  function handleBillChange(e) {
    if (e.target.value === "" || re.test(e.target.value)) {
      setBill(e.target.value);
    }
  }
  function handlePaidByUserChange(e) {
    if (e.target.value === "" || re.test(e.target.value)) {
      const newPaidByUser = Number(e.target.value);
      if (newPaidByUser <= bill) {
        setPaidByUser(e.target.value);
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💰 Bill value</label>
      <input type="text" value={bill} onChange={handleBillChange} />

      <label>🧑 Your expense</label>
      <input type="text" value={paidByUser} onChange={handlePaidByUserChange} />

      <label>👫{selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>🤑 Who is paying the bill</label>

      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
};
export default FormSplitBill;
