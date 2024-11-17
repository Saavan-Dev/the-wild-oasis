import supabase, { supabaseUrl, supabase2 } from "./supabase";

export async function signUp({ fullName, email, password }) {
  const { data, error } = await supabase2.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, avatar: "" }, // there was a bug over here
    },
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

//base version of update user data
// export async function updateCurrentUser({ password, fullName, avatar }) {
//   //1. Update password OR fullName
//   let updateData;
//   if (password) updateData = { password: password };
//   if (fullName) updateData = { data: { full_name: fullName } };
//   const { data, error } = await supabase.auth.updateUser(updateData);
//   if (error) throw new Error(error.message);
//   if (!avatar) return data;

//   //2.Upload the avatar image
//   const fileName = `avatar-${data.user.id}-${Math.random()}`;
//   const { error: storageError } = await supabase.storage
//     .from("avatars")
//     .upload(fileName, avatar);
//   if (storageError) throw new Error(storageError.message);

//   //3.Update avatar in the user
//   const { data: updatedUser, error: error2 } = supabase.auth.updateUser({
//     data: {
//       avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
//     },
//   });
//   if (error2) throw new Error(error2.message);
//   return updatedUser;
// }

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password or full_name
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { full_name: fullName } }; // Ensure consistent naming with signUp

  const { data, error: dataUpdateError } = await supabase.auth.updateUser(
    updateData
  );

  if (dataUpdateError) throw new Error(dataUpdateError.message);

  // Check if an avatar is provided. If not, return updated user data
  if (!avatar) return data;

  console.log(data.user.user_metadata.avatar?.split("/").at(-1)); // Debug log for existing avatar

  // 2. Upload the avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  // 2.1 Delete the existing avatar if it exists
  const existingAvatarPath = data.user.user_metadata.avatar?.split("/").at(-1);
  if (existingAvatarPath) {
    const { error: imageDeleteError } = await supabase.storage
      .from("avatars")
      .remove([existingAvatarPath]);

    if (imageDeleteError) throw new Error(imageDeleteError.message);
    console.log("Deleted existing avatar:", existingAvatarPath);
  }

  // 2.2 Upload the new avatar
  const { error: imageUploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (imageUploadError) throw new Error(imageUploadError.message);

  // 3. Update the avatar field in user metadata
  const { data: avatarUpdatedData, error: avatarUpdateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (avatarUpdateError) throw new Error(avatarUpdateError.message);

  return avatarUpdatedData;
}
