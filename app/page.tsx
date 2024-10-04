import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="container mx-auto py-6">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">TodoMaster</h1>
          <div>
            <Link href="/auth/signin" passHref>
              <Button variant="ghost" className="mr-2">Sign In</Button>
            </Link>
            <Link href="/auth/signup" passHref>
              <Button>Sign Up</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto mt-16 text-center">
        <h2 className="text-4xl font-bold mb-4">Manage Your Tasks with Ease</h2>
        <p className="text-xl mb-8">Stay organized and boost your productivity with TodoMaster</p>
        <Link href="/auth/signup" passHref>
          <Button size="lg">Get Started for Free</Button>
        </Link>

        <section className="mt-16">
          <h3 className="text-2xl font-semibold mb-8">Pricing Plans</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-4">Free</h4>
              <p className="text-3xl font-bold mb-4">$0<span className="text-sm font-normal">/month</span></p>
              <ul className="text-left mb-6">
                <li>✓ Up to 50 tasks</li>
                <li>✓ Basic task management</li>
                <li>✓ 1 project</li>
              </ul>
              <Button variant="outline" className="w-full">Choose Free</Button>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-4">Pro</h4>
              <p className="text-3xl font-bold mb-4">$9.99<span className="text-sm font-normal">/month</span></p>
              <ul className="text-left mb-6">
                <li>✓ Unlimited tasks</li>
                <li>✓ Advanced task management</li>
                <li>✓ Up to 10 projects</li>
                <li>✓ Collaboration features</li>
              </ul>
              <Button className="w-full">Choose Pro</Button>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-4">Enterprise</h4>
              <p className="text-3xl font-bold mb-4">Custom</p>
              <ul className="text-left mb-6">
                <li>✓ All Pro features</li>
                <li>✓ Unlimited projects</li>
                <li>✓ Priority support</li>
                <li>✓ Custom integrations</li>
              </ul>
              <Button variant="outline" className="w-full">Contact Sales</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto py-6 mt-16 text-center">
        <p>&copy; 2023 TodoMaster. All rights reserved.</p>
      </footer>
    </div>
  );
}