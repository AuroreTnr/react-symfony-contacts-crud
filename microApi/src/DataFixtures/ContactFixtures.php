<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Contact;

class ContactFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $noms = ['Durand', 'Martin', 'Bernard', 'Dubois', 'Thomas', 'Lemoine', 'Petit', 'Roux', 'Blanc', 'Lemoine'];
        $prenoms = ['Alice', 'Jean', 'Claire', 'Luc', 'Emma', 'Sophie', 'Pierre', 'Marie', 'Paul', 'Julie'];


        for ($i = 0; $i < 10; $i++) {
            $contact = new Contact();
            $contact->setNom($noms[$i]);
            $contact->setPrenom($prenoms[$i]);
            $contact->setEmail(strtolower($prenoms[$i]) . '.' . strtolower($noms[$i]) . '@exemple.com');

            $manager->persist($contact);
        }

        $manager->flush();    
    }
}
