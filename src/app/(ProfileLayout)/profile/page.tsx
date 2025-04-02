"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import CustomSelect from "@/components/ui/Select";
import { ChangeEvent, useEffect, useState } from "react";
import { getNameList } from "country-list";
import { useUser } from "@/lib/provider/UserProvider";
import Loading from "@/components/ui/Loading";
import { countryNameMapping } from "@/utils/countryNameMapping";
import Link from "next/link";
import { User } from "@/lib/interface/user.interface";
import { useUpdateUserProfileMutation } from "@/redux/api/user/user.auth";

// Define a type for the country options
interface CountryOption {
  value: string; // country code
  label: string; // country name
}

export default function EditProfile() {
  const { user } = useUser();

  // Initialize formData? state
  const [formData, setFormData] = useState<User | null>({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    addressOne: user?.addressOne ?? "",
    addressTwo: user?.addressTwo ?? "",
    city: user?.city ?? "",
    postalCode: user?.postalCode ?? "",
    state: user?.state ?? "",
    country: user?.country ?? "",
  });

  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
  const [updateError, setUpdateError] = useState();

  // Get the countries object
  const countries: { [name: string]: string } = getNameList(); // Ensure type is defined
  const [updateUser, { isLoading, error, isSuccess }] =
    useUpdateUserProfileMutation();

  // (countryOptions);

  // Populate country options on component mount
  useEffect(() => {
    if (countries) {
      const options: CountryOption[] = Object.entries(countries).map(
        ([name]) => ({
          value: name,
          label: countryNameMapping[name] || name,
        })
      );

      setCountryOptions(options);
    } else {
      console.error("Countries data is not available");
    }
  }, [countries]);

  // Update formData? when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        email: user?.email ?? "",
        phone: user?.phone ?? "",
        addressOne: user?.addressOne ?? "",
        addressTwo: user?.addressTwo ?? "",
        city: user?.city ?? "",
        postalCode: user?.postalCode ?? "",
        state: user?.state ?? "",
        country: capitalizeWords(user.country as string) ?? "",
      });
    }
  }, [user]); // Depend on user

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value } as User);
  };

  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value; // Use e.target.value directly
    setFormData({
      ...formData,
      country: capitalizeWords(selectedCountry),
    } as User);
  };

  const handleUpdate = async () => {
    try {
      await updateUser(formData as User).unwrap();
    } catch (error: { data: { message: string } } | any) {
      // (error.data.message);
      setUpdateError(error.data.message);
    }
  };

  const capitalizeWords = (str: string): string => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // (formData);

  return (
    <div className="container max-w-6xl my-10">
      {isLoading ? (
        <div className="min-h-screen w-full fixed top-0 left-0 bg-black/25 flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        ""
      )}
      <Link href={"/my-account"}>
        <Button size="static" className="w-fit text-lg mb-4">
          Back To Account Area
        </Button>
      </Link>
      <div className="w-full max-w-2xl border border-black/5 p-5 md:px-16 py-10  mx-auto">
        <div className="mb-8">
          <div className="text-4xl text-center">Profile</div>
        </div>
        <div>
          {!user ? (
            <div className="min-h-[500px] flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <form>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName">First Name</label>
                  <Input
                    required
                    className="mb-2"
                    id="firstName"
                    name="firstName"
                    defaultValue={formData?.firstName}
                    onChange={handleInputChange}
                    autoComplete="given-name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName">Last Name</label>
                  <Input
                    required
                    className="mb-2"
                    id="lastName"
                    name="lastName"
                    defaultValue={formData?.lastName}
                    onChange={handleInputChange}
                    autoComplete="family-name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Input
                  required
                  className="mb-2"
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={formData?.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <Input
                  className="mb-2"
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={formData?.phone}
                  onChange={handleInputChange}
                  autoComplete="tel"
                />
              </div>
              <div>
                <label htmlFor="addressOne">Address Line 1</label>
                <Input
                  className="mb-2"
                  id="addressOne"
                  name="addressOne"
                  defaultValue={formData?.addressOne}
                  onChange={handleInputChange}
                  autoComplete="address-line1"
                />
              </div>
              <div>
                <label htmlFor="addressTwo">Address Line 2</label>
                <Input
                  className="mb-2"
                  id="addressTwo"
                  name="addressTwo"
                  defaultValue={formData?.addressTwo}
                  onChange={handleInputChange}
                  autoComplete="address-line2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city">Town / City</label>
                  <Input
                    className="mb-2"
                    id="city"
                    name="city"
                    defaultValue={formData?.city}
                    onChange={handleInputChange}
                    autoComplete="address-level2"
                  />
                </div>
                <div>
                  <label htmlFor="postalCode">Postal Code</label>
                  <Input
                    className="mb-2"
                    id="postalCode"
                    name="postalCode"
                    defaultValue={formData?.postalCode}
                    onChange={handleInputChange}
                    autoComplete="postal-code"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="state">State/Province/Region</label>
                  <Input
                    className="mb-2"
                    id="state"
                    name="state"
                    defaultValue={formData?.state}
                    onChange={handleInputChange}
                    autoComplete="address-level1"
                  />
                </div>
                <div>
                  <label htmlFor="country">Country</label>
                  <CustomSelect
                    id="country"
                    options={countryOptions.map((option) => ({
                      ...option,
                      label: capitalizeWords(option.label),
                    }))}
                    name="country"
                    className="border-b normal-case"
                    onChange={(value) => handleCountryChange(value)} // Pass only the value
                    value={
                      formData?.country?.toLocaleLowerCase() ||
                      "united states of america"
                    }
                  />
                </div>
              </div>
              <div className="text-center mt-5 mb-10">
                <Button
                  type="button"
                  className="font-normal px-5 text-2xl mx-auto"
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              </div>
              {isSuccess ? (
                <div className="text-green-500 text-3xl md:text-4xl">
                  Profile Updated Successfully
                </div>
              ) : error ? (
                <div className="text-red-500 text-3xl md:text-4xl">
                  {updateError ? updateError : "Invalid details"}
                </div>
              ) : (
                ""
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
