const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-gray-100">
           <div className="flex flex-col pt-20 items-center justify-between px-6 py-8 mx-auto h-screen">
            <div className="w-full bg-white rounded-lg shadow mt-o max-w-md">
                {children}
            </div>
            </div> 
        </div>
    )
}

export default AuthLayout