import {Link} from "react-router-dom"
import { Button } from "@/src/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { useState } from "react"
async function signUp({ email, username, password, groups }) {
  console.log(email);
  console.log(username);
  console.log(password);
  console.log(groups);
  const response = await fetch('http://localhost:3000/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      username,
      password,
      groups
    })
  });

  const data = await response.json();
  return data;
}


export function Signup() {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [groups, setGroups] = useState(['user']);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [emailValid, setUserEmailValid] = useState(true);

  
  const handleGroupChange = (value) => {
    setGroups([value]);
  }
  
  const handleUserNameChange = (value) => {
    setUserName(value.target.value);
  }
  const handleUserEmailChange = (value) => {
    setUserEmail(value.target.value);
    validateEmail(value.target.value);
  }

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setUserEmailValid(emailRegex.test(value));
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    checkPasswordMatch(confirmPassword, e.target.value);
  }
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    checkPasswordMatch(password, e.target.value);
  }
  const checkPasswordMatch = (pwd, confirmPwd) => {
    setPasswordMatch(pwd=== confirmPwd);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailValid || !passwordMatch) {
      return;
    }
    try {
      const data = await signUp({ userEmail, username: userName, password, groups });
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">Sign</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Sign Up</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="pt-24 min-h-[calc(100vh_-_theme(spacing.16))}">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
              <div className="grid gap-2">
                <Select value={groups[0]} onValueChange={handleGroupChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="user">user</SelectItem>
                      <SelectItem value="admin">admin</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Name">Name</Label>
                <Input
                  id="Name" placeholder="Bruce" required 
                  value={userName} onChange={handleUserNameChange}  
                />
              </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={userEmail} onChange={handleUserEmailChange}  
                required
              />
            </div>
            {!emailValid && <p style={{ color: 'red' }}>Invalid email address</p>}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" type="password"
                value={password} onChange={handlePasswordChange}
                />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="corfirm password">Confirm Password</Label>
              <Input
                id="confirmPassword" type="password" 
                value={confirmPassword} onChange={handleConfirmPasswordChange}
              />
            </div>
            {!passwordMatch && <p style={{color: 'red'}}> 비밀번호가 서로 다릅니다.</p>}
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/sign/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
      </div>
    </>
  )
}
