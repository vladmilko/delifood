import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { updateProfileThunk } from "../../store/user/profile/actions";
import { ActionButton } from "../ui components/Buttons/ActionButton";

export const ClientProfile = () => {
  const dispatch = useDispatch();
  const profileData = useSelector((store) => store.auth.user) ?? {};
  const [isEdit, SetEdit] = useState(false);

  const formHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    SetEdit(false);
    dispatch(updateProfileThunk(formData))
  }

  return (
    !isEdit 
    ? 
    <>
      {Object.entries(profileData).map(([key, value]) => {
        if (key !== 'id') return <p key={key}>{value}</p>
      })}
      <ActionButton content={'Edit'} func={() => SetEdit(true)}/>
    </>
    : 
    <form onSubmit={formHandler}>
      {Object.entries(profileData).map(([key, value]) => {
        if (key !== 'id') return (
          <>
            <input type='text' name={key} defaultValue={value} /><br/>
          </>
        )
      })}
      <ActionButton content={'Save'} type='submit'/>
    </form>
  )
}