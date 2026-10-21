import type { Content } from './types'

export const en: Content = {
  ui: {
    tagline: 'Investing basics for first-gen students',
    langLabel: 'Language',
    tabs: {
      start: 'Start here',
      ready: 'Am I ready?',
      grow: 'Growth calculator',
      account: 'Which account?',
      jargon: 'Jargon buster',
      scams: 'Scam check',
    },
    disclaimerStrong: 'For learning only, not financial advice.',
    disclaimer:
      "Invest-Assist doesn't know your full situation and doesn't recommend specific companies or products. Everything you enter stays in your browser.",
    resourcesLabel: 'Trusted free resources:',
    resources: [
      { label: 'Investor.gov (SEC)', href: 'https://www.investor.gov/' },
      { label: 'CFPB', href: 'https://www.consumerfinance.gov/' },
      { label: 'IRS retirement plans', href: 'https://www.irs.gov/retirement-plans' },
    ],
    progress: (done, total, what) => `${done} of ${total} ${what}`,

    startTitle: 'Start here',
    startLead: 'Five short lessons, no jargon. About 13 minutes total. Your progress is saved on this device.',
    lessonsDone: 'lessons done',
    min: 'min',
    takeaway: 'Takeaway:',
    markDone: 'Got it, mark as done',
    markNotDone: 'Mark as not done',

    readyTitle: 'Am I ready to invest?',
    readyLead: "Most money experts suggest this order. Check off what you've already done.",
    stepsDone: 'steps done',
    nextStep: 'Your next step: work toward',
    allDone: "You've covered the basics. Keep investing automatically and leave it alone. 🎉",

    calcTitle: 'Growth calculator',
    calcLead: 'See what small, steady amounts can turn into. Change the numbers and watch the chart.',
    startAmount: 'Starting amount',
    monthlyAmount: 'Added every month',
    yearsInvested: 'Years invested',
    yearsSuffix: ' yrs',
    yearlyReturn: 'Yearly return (average)',
    calcNote:
      "Broad stock index funds have averaged roughly 6 to 7% a year after inflation over long periods, with big ups and downs along the way. A savings account might earn 0 to 2% after inflation. The past doesn't guarantee the future.",
    afterYears: (y) => `after ${y} years.`,
    youPutIn: 'You put in',
    growthAdded: 'and growth added',
    legendIn: 'What you put in',
    legendGrowth: 'Growth',
    chartLabel: (b) => `Chart: balance grows to ${b}`,

    quizTitle: 'Which account fits me?',
    quizLead: 'Four quick questions. Nothing is saved or sent anywhere.',
    quizBest: 'Good place to start',
    quizNext: 'What to do next:',
    quizAlso: 'Also worth a look:',
    startOver: 'Start over',

    jargonTitle: 'Jargon buster',
    jargonLead: 'Money words, explained like a friend would.',
    searchPlaceholder: 'Search a word… e.g. ETF, Roth, match',
    searchLabel: 'Search terms',
    example: 'Example:',
    noMatches: 'No matches. Try a different word.',

    scamTitle: 'Is this a scam?',
    scamLead: 'Thinking about an "opportunity" someone pitched you? Check anything that applies.',
    scamNone: 'No red flags checked yet. Legit investing is usually boring: low fees, no hype, no rush.',
    scamHits: (n) => `${n} red flag${n > 1 ? 's' : ''}.`,
    scamAdvice: "Even one is a reason to stop. Don't send money. Look them up on",
    brokerCheck: { label: 'FINRA BrokerCheck', href: 'https://brokercheck.finra.org/' },
    reportFraud: { label: 'ReportFraud.ftc.gov', href: 'https://reportfraud.ftc.gov/' },
  },

  lessons: [
    {
      id: 'what',
      title: 'What investing actually is',
      minutes: 2,
      body: [
        'Saving means putting money aside. Investing means using that money to buy a small piece of something, like a company, that can grow in value over time.',
        'When you buy a share of a company, you own a tiny slice of it. If the company does well, your slice can be worth more. If it does badly, your slice can be worth less.',
        'Nobody can promise you a profit. But historically, owning a wide mix of companies for a long time has grown money faster than a savings account.',
      ],
      takeaway: 'Investing = owning small pieces of things that can grow. It goes up and down, so it works best over many years.',
    },
    {
      id: 'compound',
      title: 'Why starting early matters',
      minutes: 2,
      body: [
        'Compound growth means your money earns money, and then that new money earns money too. It snowballs.',
        'Time matters more than the amount. Someone who invests $50 a month starting at 20 can end up with more than someone who invests $100 a month starting at 35.',
        'You do not need to be rich to start. Many apps let you invest $1 at a time.',
      ],
      takeaway: 'Small amounts + lots of time = big results. Try the Growth Calculator to see it.',
    },
    {
      id: 'safety',
      title: 'Build your safety net first',
      minutes: 3,
      body: [
        'Before investing, have an emergency fund: money set aside for surprises like a car repair or a lost job. Start with $500 to $1,000, then work toward a few months of expenses.',
        'Keep it in a high-yield savings account (HYSA). It is easy to reach, and FDIC insurance protects it up to $250,000 per bank if the bank fails.',
        'Pay off high-interest debt, like credit cards at 20% or more, before investing. Paying it off is a guaranteed "return" that the stock market cannot reliably beat.',
      ],
      takeaway: 'Emergency fund first, high-interest debt second, then invest.',
    },
    {
      id: 'funds',
      title: "Index funds: don't pick stocks, buy the basket",
      minutes: 3,
      body: [
        'Picking single stocks is hard, even for professionals. An index fund buys a little of hundreds or thousands of companies at once, so one bad company does not sink you.',
        'Look for low fees. The "expense ratio" is the yearly fee. Many broad index funds charge under 0.10%, which is about $1 a year per $1,000 invested.',
        'A total stock market fund or an S&P 500 fund is a common first choice. A "target-date fund" picks the mix for you based on when you plan to retire.',
      ],
      takeaway: 'A low-cost, broad index fund is a simple, popular way to start.',
    },
    {
      id: 'accounts',
      title: 'Where your money lives: accounts',
      minutes: 3,
      body: [
        'An account is the container. Investments (like index funds) go inside it. The container decides how taxes work.',
        'A 401(k) or 403(b) is a retirement account through your job. If your employer offers a "match", that is free money. Contribute at least enough to get all of it.',
        'A Roth IRA is a retirement account you open yourself. You need income from work (a job or self-employment) to put money in. It grows tax-free, and you can take out what you put in (not the growth) at any time without penalty.',
        'A regular brokerage account has no special tax perks but no limits or rules on when you can withdraw.',
      ],
      takeaway: 'Grab any employer match, then consider a Roth IRA. Check IRS.gov for this year’s contribution limits.',
    },
  ],

  glossary: [
    { term: 'Stock (share)', plain: 'A tiny piece of ownership in one company.', example: 'Owning 1 share of a company with 1 million shares means you own one-millionth of it.' },
    { term: 'Bond', plain: 'A loan you give to a government or company. They pay you interest and pay you back later.', example: 'Usually steadier than stocks, but grows more slowly.' },
    { term: 'Index fund', plain: 'A fund that buys every company in a list (an "index"), so you own a little of all of them.' },
    { term: 'ETF', plain: 'Exchange-traded fund. A basket of investments you can buy and sell like a single stock. Many index funds are ETFs.' },
    { term: 'Mutual fund', plain: 'A basket of investments managed as one. Bought and sold once a day at the closing price.' },
    { term: 'S&P 500', plain: 'A list of about 500 of the largest U.S. companies. People often use it to describe "the market".' },
    { term: 'Diversification', plain: 'Not putting all your eggs in one basket. Spreading money across many investments lowers the risk of one disaster.' },
    { term: 'Compound growth', plain: 'Earning returns on your past returns, so growth snowballs over time.' },
    { term: 'Expense ratio', plain: 'The yearly fee a fund charges, shown as a percent of what you have invested.', example: '0.05% on $1,000 is 50 cents a year.' },
    { term: 'Return', plain: 'How much your investment gained or lost, usually shown as a percent.' },
    { term: 'Volatility', plain: 'How much and how fast prices bounce up and down.' },
    { term: 'Bear / bull market', plain: 'Bear = prices falling for a while. Bull = prices rising for a while.' },
    { term: 'Dividend', plain: 'A share of company profits paid out to people who own the stock.' },
    { term: 'Brokerage', plain: 'A company (often an app) where you open an account to buy and sell investments.' },
    { term: 'Roth IRA', plain: 'A retirement account you open yourself. You pay taxes now, and it grows and comes out tax-free in retirement. You need earned income to contribute.' },
    { term: '401(k) / 403(b)', plain: 'A retirement account offered through your job. Money comes straight out of your paycheck.' },
    { term: 'Employer match', plain: 'When your job adds money to your 401(k) because you did. Basically free money.', example: '"100% match up to 4%" means if you put in 4% of your pay, they add another 4%.' },
    { term: 'HYSA', plain: 'High-yield savings account. A savings account that pays more interest than a typical bank. Great for emergency funds.' },
    { term: 'FDIC insurance', plain: 'U.S. government protection for bank deposits, up to $250,000 per person per bank, if the bank fails. It does not cover investments.' },
    { term: 'SIPC', plain: 'Protects you if your brokerage company fails (not if your investments lose value).' },
    { term: 'Target-date fund', plain: 'An all-in-one fund that automatically gets more cautious as your retirement year gets closer.' },
    { term: 'Dollar-cost averaging', plain: 'Investing the same amount on a schedule (like every payday), no matter what prices are doing.' },
    { term: 'Capital gains', plain: 'The profit you make when you sell something for more than you paid. It may be taxed.' },
    { term: 'Credit score', plain: 'A number lenders use to judge how likely you are to pay back debt. Paying on time is the biggest factor.' },
    { term: 'APR', plain: 'The yearly interest rate on a loan or credit card. Higher APR = more expensive debt.' },
  ],

  readySteps: [
    { id: 'budget', label: 'I know roughly how much comes in and goes out each month', why: 'You can only invest money you will not need for bills.' },
    { id: 'starter', label: 'I have a starter emergency fund ($500 to $1,000)', why: 'This keeps a surprise bill from becoming credit card debt.' },
    { id: 'highdebt', label: 'I have no credit card or other debt above about 8% interest', why: 'Paying off high-interest debt is a guaranteed win.' },
    { id: 'match', label: 'If my job offers a 401(k) match, I contribute enough to get all of it', why: 'A match is often an instant 50% to 100% return.' },
    { id: 'full', label: 'My emergency fund covers about 3 months of expenses', why: 'This lets you leave investments alone when life gets bumpy.' },
    { id: 'roth', label: 'I have opened (or am ready to open) a Roth IRA', why: 'Tax-free growth, and early savers benefit the most.' },
    { id: 'fund', label: 'I picked a low-cost, broad index fund or target-date fund', why: 'Simple, diversified, and cheap. No stock picking needed.' },
    { id: 'auto', label: 'I set up automatic monthly investing', why: 'Automating it means you never have to remember or time the market.' },
  ],

  redFlags: [
    'They promise "guaranteed" returns or "no risk".',
    'They say you must act right now or miss out.',
    'You found it through a DM, a social media influencer, or a stranger in a group chat.',
    'They want payment in crypto, gift cards, or a wire transfer.',
    'They ask you to recruit friends to earn more.',
    'You cannot explain how it actually makes money.',
    'The person or company is not registered (check FINRA BrokerCheck or the SEC’s Investor.gov).',
    'They ask for your bank login, Social Security number, or a "small fee" to release your winnings.',
  ],

  quiz: [
    {
      q: 'When might you need this money?',
      options: ['Within the next year or so', 'In 1 to 5 years (car, grad school, moving)', 'Not for a long time, maybe retirement'],
    },
    {
      q: 'Do you have an emergency fund yet?',
      options: ['Not really', 'A little, under $1,000', 'Yes, a few months of expenses'],
    },
    {
      q: 'Do you earn money from a job or side gig?',
      options: ['Yes, and my job offers a 401(k) match', 'Yes, but no 401(k) match', 'Not right now'],
    },
    {
      q: 'How would you feel if your investment dropped 20% in a bad year?',
      options: ["I'd panic and want my money out", "Nervous, but I'd wait it out", "Fine, I'm in it for the long run"],
    },
  ],

  accountInfo: {
    hysa: {
      name: 'High-Yield Savings Account (HYSA)',
      summary: 'Your best first move is a safe, easy-to-reach place for money you might need soon. It earns interest and is FDIC insured.',
      next: 'Compare HYSAs from FDIC-insured banks or credit unions (NCUA insured). Look for no monthly fees and no minimum balance.',
    },
    k401: {
      name: '401(k) / 403(b) through your job',
      summary: 'Your employer match is free money. Contribute at least enough to get the full match before anything else.',
      next: "Ask HR or check your benefits portal for the match rules. If you're unsure what to pick, choose the target-date fund closest to your retirement year.",
    },
    roth: {
      name: 'Roth IRA',
      summary: 'A great fit for students and early-career workers. You pay tax now while your income is likely low, and it grows tax-free.',
      next: 'Open one at a major low-cost brokerage, then buy a broad index fund or target-date fund inside it. Opening the account alone is not investing.',
    },
    brokerage: {
      name: 'Regular brokerage account',
      summary: 'Flexible, with no limits and no withdrawal rules, but no tax breaks. Good for medium-term goals after your retirement basics are covered.',
      next: 'Use a low-cost brokerage with no account minimums, and stick to diversified index funds.',
    },
  },
}
