"use client"
import Navigation from "../../../Components/Navigation";
import { useRouter } from "next/navigation";

export default function EditUserPage({ params }: { params: { id: number } }) {
  
    return (
        <>
        <Navigation />
      <div>
        <form>
          <label>
            Name: 
            <input type="text" name="name" placeholder="Enter new name" />
          </label>
          <br />
          <br />
          <button type="submit">Save Changes</button>
        </form>
      </div>
      </>
    );
}
  