export type RootStackParamList = {

    SignInSignUpScreen:    undefined;
    LogInScreen:           undefined;
    SignUpScreen:          undefined;
    ForgetPasswordScreen:  undefined;
    ResetPasswordScreen:   undefined;
  
    MainDrawer:            undefined;

    MainTab:               undefined;
    ProfileScreen:         undefined;
    ProductScreen:         undefined;
    EditProduct:           { product: any };
    AboutUsScreen:         undefined;
    HelpCenterScreen:      undefined;

    HomeScreen:            undefined;
    UploadScreen:          undefined;
    CartScreen:            undefined;
    ProfileTab:            undefined;

    MarketplaceScreen:     undefined;
    MarketplaceDetail:     { product: any };

    PaymentScreen:         { total: number };
    PaymentSuccessScreen:  undefined;
    BottomTabNavigator: undefined;
  };