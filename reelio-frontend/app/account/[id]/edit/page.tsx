"use client"
import Navigation from "../../../Components/Navigation";

export default function EditUserPage({ params }: { params: { id: number } }) {
  
    return (
        <>
        <Navigation />
      <div>
        <h1>Edit User</h1>
        <form>
          <label>
            Name: id={params.id}
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
  