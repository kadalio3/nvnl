import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { compare, hash } from "bcrypt-ts";

interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  roles: {
    name: string;
  }[];
}

interface UserProfileResponse {
  success: boolean;
  message?: string;
  data?: UserProfile;
}

export async function updateProfile(formData: FormData) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized"
    };
  }
  
  try {
    // Get form data
    const name = formData.get('name') as string;
    
    // Prepare update data with just the name initially
    const updateData: { name?: string; image?: string } = {
      name: name || undefined,
    };

    // Only handle image if it was included in the form data
    const imageBase64 = formData.get('imageBase64');
    if (imageBase64) {
      updateData.image = imageBase64 as string;
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        roles: {
          select: {
            name: true
          }
        }
      }
    });

    return { success: true, data: updatedUser };

  } catch (error) {
    console.error('Update profile error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update profile"
    };
  }
}
// Update password function
export async function updatePassword(formData: FormData) {
    const session = await auth();
    if (!session) {
      return { success: false, message: "Unauthorized" };
    }
  
    try {
      const currentPassword = formData.get('currentPassword') as string;
      const newPassword = formData.get('newPassword') as string;
      const confirmPassword = formData.get('confirmPassword') as string;
  
      // Validate inputs
      if (!currentPassword || !newPassword || !confirmPassword) {
        return { success: false, message: "All password fields are required" };
      }
  
      if (newPassword !== confirmPassword) {
        return { success: false, message: "New passwords don't match" };
      }
  
      if (newPassword.length < 6) {
        return { success: false, message: "Password must be at least 6 characters" };
      }
  
      // Get current user with password
      const user = await prisma.user.findUnique({
        where: { id: session.user.id }
      });
  
      if (!user?.password) {
        return { success: false, message: "No password set for this account" };
      }
  
      // Verify current password
      const isPasswordValid = await compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return { success: false, message: "Current password is incorrect" };
      }
  
      // Hash and update new password
      const hashedPassword = await hash(newPassword, 12);
      await prisma.user.update({
        where: { id: session.user.id },
        data: { password: hashedPassword }
      });
  
      return { success: true, message: "Password updated successfully" };
  
    } catch (error) {
      console.error('Update password error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to update password"
      };
    }
}

export async function getUserProfile(userId: string): Promise<UserProfileResponse> {
  try {
    // Cek jika userId ada
    if (!userId) {
      return {
        success: false,
        message: "User ID is required"
      };
    }

    // Ambil data user dengan relasi yang diperlukan
    const user = await prisma.user.findUnique({
      where: { 
        id: userId 
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        roles: {
          select: {
            name: true
          }
        }
      }
    });

    if (!user) {
      return {
        success: false,
        message: "User not found"
      };
    }

    return {
      success: true,
      data: user
    };

  } catch (error) {
    console.error("Get user profile error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to get user profile"
    };
  }
}