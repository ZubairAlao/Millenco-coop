import React, { useState } from 'react'
import { getProfileData } from '../../services/firebase';
import { auth } from '../../services/firebase';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {updateProfileData} from '../../services/firebase';
import {uploadImageToFirebase} from '../../services/firebase';
import { updateProfile } from 'firebase/auth';


export default function UserProfile() {

  const queryClient = useQueryClient()

  const [userName, setUserName] = useState('');
  const [userNameEdit, setUserNameEdit] = useState(false);

  const [email, setEmail] = useState('');
  const [emailEdit, setEmailEdit] = useState(false);

  const [plan, setPlan] = useState('');
  const [planEdit, setPlanEdit] = useState(false);

  const [address, setAddress] = useState('');
  const [addressEdit, setAddressEdit] = useState(false);

  const [gender, setGender] = useState('');
  const [genderEdit, setGenderEdit] = useState(false);

  const [phone, setPhone] = useState('');
  const [phoneEdit, setPhoneEdit] = useState(false);

  const [imageEdit, setImageEdit] = useState(false);
  const [image, setImage] = useState(null);

  console.log(auth.currentUser);

  const saveProfile = async () => {
    try {
      // Update each field individually
      if (userNameEdit) {
        await updateProfileData(auth.currentUser.uid, { userName : userName });
        setUserNameEdit(false);
      }
      if (emailEdit) {
        await updateProfileData(auth.currentUser.uid, { email: email });
        setEmailEdit(false);
      }
      if (planEdit) {
        await updateProfileData(auth.currentUser.uid, { plan:plan });
        setPlanEdit(false);
      }

      if (addressEdit) {
        await updateProfileData(auth.currentUser.uid, { address:address });
        setAddressEdit(false);
      }
      if (genderEdit) {
        await updateProfileData(auth.currentUser.uid, { gender:gender });
        setGenderEdit(false);
      }

      if (phoneEdit) {
        await updateProfileData(auth.currentUser.uid, { phone:phone });
        setPhoneEdit(false);
      }

      if (imageEdit && image) {
        const imageUrl = await uploadImageToFirebase(image);
        if (imageUrl) {
          await updateProfileData(auth.currentUser.uid, { imageUrl: imageUrl });
          await updateProfile(auth.currentUser, {
            photoURL: imageUrl
          })
          setImageEdit(false);
        } else {
          console.error('Image URL is undefined');
          // Handle the case where imageUrl is undefined, e.g., display an error message
        }
      }
      // Reset image state
      setImage(null);
      queryClient.invalidateQueries({ queryKey: ['profileData'] })
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };



  const { isPending, isError, data, error } = useQuery({
    queryKey: ['profileData'],
    queryFn: async () => {
      const userId = auth.currentUser.uid;
      return await getProfileData(userId);
    }
  })

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  // console.log(data);
  return (
    <div className="sm:mx-auto sm:w-full max-w-screen-xl px-8 text-sm">
      <h1 className="text-2xl text-center font-bold mb-4">User Profile</h1>
      <div className='grid gap-2'>
      <div className='flex justify-center items-center gap-4'>
      <div className="bg-cover bg-center bg-no-repeat rounded-full h-40 w-40 bg-[#388E3C] dark:bg-[#ff6f00]" style={{ backgroundImage: `url(${data.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}> </div>
        {imageEdit ? <input type='file' onChange={(e) => setImage(e.target.files[0])} /> : null}
        <button className="border py-2 px-4 rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" onClick={() => {setImageEdit(!imageEdit); if (imageEdit) {saveProfile();} }}>
          {imageEdit ? 'Save' : 'Edit'}
        </button>
      </div>

        <div className='flex items-center border p-4 rounded-md border-[#388E3C] dark:border-[#ff6f00]'>
          <div>
            <p className='text-base font-semibold'>Personal Information</p>
            <p><span className="font-bold">Name:</span> {userNameEdit ? <input type="text" name="username" id="username" value={userName} onChange={(e) => setUserName(e.target.value)} required autoComplete="username"/> : data.userName}</p>
          </div>
          <button className="ml-auto border py-2 px-4 rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" onClick={() => {setUserNameEdit(!userNameEdit); if (userNameEdit) {saveProfile();}}}>
            {userNameEdit ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className='flex items-center border p-4 rounded-md border-[#388E3C] dark:border-[#ff6f00]'>
          <div>
            <p className='text-base font-semibold'>Email Address</p>
            <p><span className="font-bold">Email:</span> {emailEdit ? <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email"/> : data.email}</p>
          </div>
          <button
            className="ml-auto border py-2 px-4 rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" onClick={() => {setEmailEdit(!emailEdit); if (emailEdit) {saveProfile();}}}
          >
            {emailEdit ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className='flex items-center border p-4 rounded-md border-[#388E3C] dark:border-[#ff6f00]'>
          <div>
            <p className='text-base font-semibold'>Plan</p>
            <p><span className="font-bold">Plan:</span> {planEdit ? <input type="text" name="plan" id="plan" value={plan} onChange={(e) => setPlan(e.target.value)} required autoComplete="plan"/> : data.plan}</p>
          </div>
          <button className="ml-auto border py-2 px-4 rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" onClick={() => {setPlanEdit(!planEdit); if (planEdit) {saveProfile();}}}>
            {planEdit ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className='flex items-center border p-4 rounded-md border-[#388E3C] dark:border-[#ff6f00]'>
          <div>
            <p className='text-base font-semibold'>Address</p>
            <p><span className="font-bold">Address:</span> {addressEdit ? <input type="text" name="address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required autoComplete="address"/> : data.address}</p>
          </div>
          <button className="ml-auto border py-2 px-4 rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" onClick={() => {setAddressEdit(!addressEdit); if (addressEdit) {saveProfile();}}}>
            {addressEdit ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className='flex items-center border p-4 rounded-md border-[#388E3C] dark:border-[#ff6f00]'>
          <div>
            <p className='text-base font-semibold'>Gender</p>
            <p><span className="font-bold">Gender:</span> {genderEdit ? <input type="text" name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required autoComplete="gender"/> : data.gender}</p>
          </div>
          <button className="ml-auto border py-2 px-4 rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" onClick={() => {setGenderEdit(!genderEdit); if (genderEdit) {saveProfile();}}}>
            {genderEdit ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className='flex items-center border p-4 rounded-md border-[#388E3C] dark:border-[#ff6f00]'>
          <div>
            <p className='text-base font-semibold'>Phone</p>
            <p><span className="font-bold">Phone:</span> {phoneEdit ? <input type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required autoComplete="phone"/> : data.phone}</p>
          </div>
          <button className="ml-auto border py-2 px-4 rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" onClick={() => {setPhoneEdit(!phoneEdit); if (phoneEdit) {saveProfile();}}}>
            {phoneEdit ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>
    </div>
  )
}

// Utilizes the Header, UserDashboard, and Footer components.
//     May include additional components for displaying account information and transaction history.
// Displays a personalized dashboard for the logged-in user.
//     Shows user-specific information like account balance, recent transactions,

//  account settings h3
// avatar
// profile setting
// name phone email password new password