import React, { useState } from 'react'
import { getProfileData } from '../../services/firebase';
import { auth } from '../../services/firebase';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {updateProfileData} from '../../services/firebase';
import {uploadImageToFirebase} from '../../services/firebase';
import { updateProfile, updateEmail, deleteUser } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


export default function UserProfile() {

  const queryClient = useQueryClient()
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [userNameEdit, setUserNameEdit] = useState(false);

  const [email, setEmail] = useState('');
  const [emailEdit, setEmailEdit] = useState(false);

  const [referralName, setReferralName] = useState('');
  const [referralNameEdit, setReferralNameEdit] = useState(false);

  const [address, setAddress] = useState('');
  const [addressEdit, setAddressEdit] = useState(false);

  const [gender, setGender] = useState('');
  const [genderEdit, setGenderEdit] = useState(false);

  const [phone, setPhone] = useState('');
  const [phoneEdit, setPhoneEdit] = useState(false);

  const [imageEdit, setImageEdit] = useState(false);
  const [image, setImage] = useState(null);

  const [deleteUserLoading, setDeleteUserLoading] = useState(null);

  console.log(auth.currentUser);

  const saveProfile = async () => {
    try {
      // Update each field individually
      if (userNameEdit) {
        await updateProfileData(auth.currentUser.uid, { userName : userName });
        await updateProfile(auth.currentUser, {
          displayName: userName
        })
        setUserNameEdit(false);
      }
      if (emailEdit) {
        await updateProfileData(auth.currentUser.uid, { email: email });
        // await updateEmail(auth.currentUser, email)
        setEmailEdit(false);
      }
      if (referralNameEdit) {
        await updateProfileData(auth.currentUser.uid, { referralName: referralName });
        setReferralNameEdit(false);
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

  async function handleDeleteUser() {
    setDeleteUserLoading(true)
    try {
      await deleteUser(auth.currentUser)
      navigate("/")
    } catch (error) {
      console.error("Error sending password reset email:", error.message);
    }
    finally{
        setDeleteUserLoading(false);
    }
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['profileData'],
    queryFn: async () => {
      const userId = auth.currentUser.uid;
      return await getProfileData(userId);p
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

        <div className='flex items-center justify-center border p-4 rounded-md border-[#388E3C] dark:border-[#ff6f00]'>
          <div>
            <p className='text-base font-semibold'>Personal Information</p>
            <p><span className="font-bold">Name:</span> {userNameEdit ? <input type="text" name="username" id="username" value={userName} onChange={(e) => setUserName(e.target.value)} required/> : data.userName}</p>
          </div>
          <div className='ml-auto'>
            <button className="border py-2 px-4 mr-3 rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" onClick={() => {setUserNameEdit(!userNameEdit); if (userNameEdit) {saveProfile();}}}>
              {userNameEdit ? 'Save' : 'Edit'}
            </button>
            {userNameEdit ? 
              <button className="border py-2 px-4 rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" onClick={() => setUserNameEdit(!userNameEdit)}>
                cancel
              </button> : null
            } 
          </div>
        </div>

        {/* <div className='flex items-center border p-4 rounded-md border-[#388E3C] dark:border-[#ff6f00]'>
          <div>
            <p className='text-base font-semibold'>Email Address</p>
            <p><span className="font-bold">Email:</span> {emailEdit ? <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email"/> : data.email}</p>
          </div>
          <div className='ml-auto'>
            <button className="border py-2 px-4 mr-3 rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" onClick={() => {setEmailEdit(!emailEdit); if (emailEdit) {saveProfile();}}}>
              {emailEdit ? 'Save' : 'Edit'}
            </button>
            {emailEdit ? 
              <button className="border py-2 px-4 rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" onClick={() => setEmailEdit(!emailEdit)}>
                cancel
              </button> : null
            } 
          </div>
        </div> */}

        <div className='flex items-center border p-4 rounded-md border-[#388E3C] dark:border-[#ff6f00]'>
          <div>
            <p className='text-base font-semibold'>Address</p>
            <p><span className="font-bold">Address:</span> {addressEdit ? <input type="text" name="address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required autoComplete="address"/> : data.address}</p>
          </div>
          <div className='ml-auto'>
            <button className="border py-2 px-4 mr-3 rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" onClick={() => {setAddressEdit(!addressEdit); if (addressEdit) {saveProfile();}}}>
              {addressEdit ? 'Save' : 'Edit'}
            </button>
            {addressEdit ? 
              <button className="border py-2 px-4 rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" onClick={() => setAddressEdit(!addressEdit)}>
                cancel
              </button> : null
            } 
          </div>
        </div>

        <div className='flex items-center justify-center border p-4 rounded-md border-[#388E3C] dark:border-[#ff6f00]'>
          <div>
            <p className='text-base font-semibold'>Gender</p>
            <p><span className="font-bold">Gender:</span> 
              {genderEdit ? 
              <select id='gender' name="gender" required autoComplete="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option disabled value="" selected>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="none">I prefer not to say</option>
              </select> : data.gender}
            </p>
          </div>
          <div className='ml-auto'>
            <button className="border py-2 px-4 mr-3 rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" onClick={() => {setGenderEdit(!genderEdit); if (genderEdit) {saveProfile();}}}>
              {genderEdit ? 'Save' : 'Edit'}
            </button>
            {genderEdit ? 
              <button className="border py-2 px-4 rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" onClick={() => setGenderEdit(!genderEdit)}>
                cancel
              </button> : null
            } 
          </div>
        </div>

        <div className='flex items-center border p-4 rounded-md border-[#388E3C] dark:border-[#ff6f00]'>
          <div>
            <p className='text-base font-semibold'>Phone</p>
            <p><span className="font-bold">Phone:</span> {phoneEdit ? <input type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required autoComplete="phone"/> : data.phone}</p>
          </div>
          <div className='ml-auto'>
            <button className="border py-2 px-4 mr-3 rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" onClick={() => {setPhoneEdit(!phoneEdit); if (phoneEdit) {saveProfile();}}}>
              {phoneEdit ? 'Save' : 'Edit'}
            </button>
            {phoneEdit ? 
              <button className="border py-2 px-4 rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" onClick={() => setPhoneEdit(!phoneEdit)}>
                cancel
              </button> : null
            } 
          </div>
        </div>

        <div className='flex items-center border p-4 rounded-md border-[#388E3C] dark:border-[#ff6f00]'>
          <div>
            <p className='text-base font-semibold'>Referral Name</p>
            <p><span className="font-bold">Referral:</span> {referralNameEdit ? <input type="text" name="plan" id="plan" value={referralName} onChange={(e) => setReferralName(e.target.value)} required autoComplete="plan"/> : data.referralName}</p>
          </div>
          <div className='ml-auto'>
            <button className="border py-2 px-4 mr-3 rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" onClick={() => {setReferralNameEdit(!referralNameEdit); if (referralNameEdit) {saveProfile();}}}>
              {referralNameEdit ? 'Save' : 'Edit'}
            </button>
            {referralNameEdit ?
              <button className="border py-2 px-4 rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" onClick={() => setReferralNameEdit(!referralNameEdit)}>
                cancel
              </button> : null
            } 
          </div>
        </div>

        {/* <div className='mx-auto'>
          <button className="border py-2 px-4 mr-3 rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 inline"  onClick={handleDeleteUser}>
              {deleteUserLoading ? "Deleting user..." : "Delete Account"}
          </button>
        </div> */}
      </div>
    </div>
  )
}
